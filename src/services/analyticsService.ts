import { v4 as uuidv4 } from 'uuid';

interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: string[];
  pageViews: { [key: string]: number };
  sessionStart: number;
  totalTimeSpent: number;
}

const ANALYTICS_KEY = 'portfolio_analytics';
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export class AnalyticsService {
  private static instance: AnalyticsService;
  private analyticsData: AnalyticsData;
  private visitorId: string;
  private lastActivity: number;

  private constructor() {
    this.visitorId = localStorage.getItem('visitor_id') || uuidv4();
    localStorage.setItem('visitor_id', this.visitorId);
    
    this.analyticsData = this.loadAnalyticsData();
    this.lastActivity = Date.now();
    
    // Update activity time every 5 seconds
    setInterval(() => {
      const now = Date.now();
      if (now - this.lastActivity > SESSION_TIMEOUT) {
        this.endSession();
      }
      this.lastActivity = now;
    }, 5000);
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  private loadAnalyticsData(): AnalyticsData {
    const savedData = localStorage.getItem(ANALYTICS_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      totalVisits: 0,
      uniqueVisitors: [],
      pageViews: {},
      sessionStart: Date.now(),
      totalTimeSpent: 0,
    };
  }

  private saveAnalyticsData(): void {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(this.analyticsData));
  }

  public trackPageView(pagePath: string): void {
    // Track as new visit if this is the first page view in this session
    if (this.analyticsData.totalVisits === 0) {
      this.analyticsData.totalVisits += 1;
      if (!this.analyticsData.uniqueVisitors.includes(this.visitorId)) {
        this.analyticsData.uniqueVisitors.push(this.visitorId);
      }
    }

    // Track page view
    const currentViews = this.analyticsData.pageViews[pagePath] || 0;
    this.analyticsData.pageViews[pagePath] = currentViews + 1;

    this.saveAnalyticsData();
  }

  public endSession(): void {
    const now = Date.now();
    const timeSpent = now - this.analyticsData.sessionStart;
    this.analyticsData.totalTimeSpent += timeSpent;
    
    // Reset session data
    this.analyticsData.sessionStart = now;
    this.saveAnalyticsData();
  }

  public getAnalyticsData(): {
    totalVisits: number;
    uniqueVisitors: number;
    averageTime: string;
    pageViews: { [key: string]: number };
  } {
    const averageTime = this.calculateAverageTime();
    return {
      totalVisits: this.analyticsData.totalVisits,
      uniqueVisitors: this.analyticsData.uniqueVisitors.length,
      averageTime,
      pageViews: { ...this.analyticsData.pageViews },
    };
  }

  private calculateAverageTime(): string {
    const averageMs = this.analyticsData.totalTimeSpent / 
      Math.max(1, this.analyticsData.uniqueVisitors.length);
    const minutes = Math.floor(averageMs / 60000);
    const seconds = Math.floor((averageMs % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Initialize analytics when the page loads
window.addEventListener('load', () => {
  const analytics = AnalyticsService.getInstance();
  analytics.trackPageView(window.location.pathname);
});

// Track page views on route changes (for single-page apps)
window.addEventListener('popstate', () => {
  const analytics = AnalyticsService.getInstance();
  analytics.trackPageView(window.location.pathname);
});
