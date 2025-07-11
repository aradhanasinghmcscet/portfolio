# Aradhana's Tech Odyssey

A modern, interactive portfolio website and mobile applications showcasing my expertise in UI/UX, Frontend Development, MERN Stack, Node.js, Splunk, and Adobe technologies.

## Features

- 🎨 Responsive Design for all devices
- 🚀 Fast and optimized performance
- 📱 Native mobile applications (Android & iOS)
- 🎯 Interactive project showcase
- 📊 Real-time analytics dashboard
- 🌐 Cross-platform compatibility

## Technologies Used

- Frontend: React.js, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Mobile: React Native
- Additional: Python (for backend services), Redis (for caching)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

1. Node.js (v18 or higher)
2. MongoDB
3. Python 3.10+
4. For mobile development:
   - Android Studio (for Android development)
   - Xcode (for iOS development)

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aradhana-portfolio.git
cd aradhana-portfolio
```

2. Set up environment variables:
   - Copy `.env.example` to `.env` in the backend directory:
   ```bash
cp backend/.env.example backend/.env
```
   - Update the `.env` file with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/aradhana-portfolio
   EMAIL_USER=your.email@example.com
   EMAIL_PASS=your-email-password
   JWT_SECRET=your-secret-key-here
   ```

3. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install

   # Install mobile app dependencies (optional)
   cd ../mobile
   npm install
   ```

### Running the Application

1. Start MongoDB:
   ```bash
   # On Windows
   mongod

   # On macOS/Linux
   sudo service mongod start
   ```

2. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

3. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

4. Access the application:
   - Web: Open http://localhost:3008 in your browser
   - API: Running on http://localhost:5001

### Running the Mobile App

1. For Android:
   ```bash
   # Make sure you have an Android emulator running or a device connected
   cd mobile
   npm run android
   ```

2. For iOS:
   ```bash
   # Make sure you have Xcode open and an iOS simulator running
   cd mobile
   npm run ios
   ```

### Building for Production

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Build the mobile app:
   ```bash
   # For Android
   cd mobile
   cd android
   ./gradlew assembleRelease

   # For iOS
   cd mobile/ios
   xcodebuild -scheme AradhanaPortfolio -configuration Release
   ```

### Troubleshooting

1. If you encounter MongoDB connection issues:
   - Ensure MongoDB is running
   - Verify the MONGODB_URI in your .env file
   - Check MongoDB logs for errors

2. If you encounter npm installation issues:
   - Clear npm cache: `npm cache clean --force`
   - Remove node_modules: `rm -rf node_modules`
   - Reinstall dependencies: `npm install`

3. If you encounter CORS issues:
   - Ensure the frontend is running on the correct port
   - Verify the backend CORS configuration
   - Check your browser's console for error messages

### Additional Notes

- The mobile app uses WebView to display the portfolio
- Analytics data is stored in MongoDB
- Contact form submissions are sent via email
- The application is responsive and works on all devices
- Make sure to update the email configuration in the backend before using the contact form

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Additional Notes

1. The mobile app uses WebView to display the portfolio
2. Analytics data is stored in MongoDB
3. Contact form submissions are sent via email
4. The application is responsive and works on all devices
5. Make sure to update the email configuration in the backend before using the contact form

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
