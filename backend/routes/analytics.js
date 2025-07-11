const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Analytics schema
const analyticsSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  device: { type: String, required: true },
  browser: { type: String, required: true },
  os: { type: String, required: true },
  location: {
    country: String,
    city: String,
    region: String,
  },
  duration: { type: Number, default: 0 }, // in seconds
});

const Analytics = mongoose.model('Analytics', analyticsSchema);

// Track page view
router.post('/track', async (req, res) => {
  try {
    const userAgent = req.headers['user-agent'];
    const { device, browser, os } = parseUserAgent(userAgent);
    
    const analytics = new Analytics({
      device,
      browser,
      os,
      location: await getLocation(req.headers['x-forwarded-for'] || req.connection.remoteAddress),
    });
    
    await analytics.save();
    res.status(200).json({ message: 'Analytics tracked successfully' });
  } catch (error) {
    console.error('Error tracking analytics:', error);
    res.status(500).json({ message: 'Error tracking analytics' });
  }
});

// Get analytics stats
router.get('/', async (req, res) => {
  try {
    const [totalVisits, uniqueVisitors, deviceStats] = await Promise.all([
      Analytics.countDocuments(),
      Analytics.distinct('ip').length,
      Analytics.aggregate([
        { $group: { _id: '$device', count: { $sum: 1 } } }
      ]),
    ]);

    const stats = {
      totalVisits,
      uniqueVisitors,
      deviceStats: deviceStats.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, { desktop: 0, mobile: 0, tablet: 0 }),
    };

    res.json(stats);
  } catch (error) {
    console.error('Error getting analytics:', error);
    res.status(500).json({ message: 'Error getting analytics' });
  }
});

// Helper functions
function parseUserAgent(userAgent) {
  const device = /Mobile|Android|iPhone|iPod/.test(userAgent) ? 'mobile' :
                 /iPad|Tablet/.test(userAgent) ? 'tablet' : 'desktop';
  
  const browserMatch = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)\/(\d+)/);
  const browser = browserMatch ? browserMatch[1] : 'Unknown';
  
  const osMatch = userAgent.match(/(Windows|Mac|Linux|Android|iOS)/);
  const os = osMatch ? osMatch[1] : 'Unknown';
  
  return { device, browser, os };
}

async function getLocation(ip) {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    const data = await response.json();
    return {
      country: data.country_name,
      city: data.city,
      region: data.region,
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return {};
  }
}

module.exports = router;
