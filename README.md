# Task Manager App

A modern React Native task management application built with Expo, featuring a clean UI and real-time database synchronization.

## 🚀 Features

- ✅ Create, complete, and delete tasks
- 📱 Cross-platform (iOS, Android, Web)
- 🎨 Modern light theme with clean UI
- 🔄 Real-time database synchronization
- 🌐 Network-accessible API server
- 📊 PostgreSQL database with Neon

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI** - Install globally: `npm install -g @expo/cli`
- **Git** - [Download here](https://git-scm.com/)

### For Mobile Development:
- **Expo Go** app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))
- **Xcode** (for iOS development on Mac)
- **Android Studio** (for Android development)

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd to-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the project root:

```bash
# Database Configuration
NEON_DATABASE_URL=your_neon_database_url_here

# API Configuration (replace with your computer's IP address)
EXPO_PUBLIC_API_URL=http://192.168.1.18:4000
```

**Important:** Replace `192.168.1.18` with your computer's actual IP address. To find your IP:

```bash
# On macOS/Linux
ipconfig getifaddr en0

# On Windows
ipconfig | findstr IPv4
```

### 4. Database Setup

This project uses Neon PostgreSQL. Follow these steps:

1. **Create a Neon Account**: Visit [neon.tech](https://neon.tech) and create a free account
2. **Create a Database**: Set up a new PostgreSQL database
3. **Get Connection String**: Copy your database connection URL
4. **Update .env**: Add your `NEON_DATABASE_URL` to the `.env` file
5. **Initialize Database**: The database schema will be created automatically when you first run the API server

## 🚀 Running the Application

### Development Mode (Recommended)

Run both the API server and Expo development server simultaneously:

```bash
npm run dev
```

This command starts:
- API server on `http://localhost:4000`
- Expo development server with QR code for mobile testing

### Individual Commands

**Start API Server Only:**
```bash
npm run api
```

**Start Expo Development Server Only:**
```bash
npm start
```

**Build for Production:**
```bash
# iOS
npm run ios

# Android  
npm run android

# Web
npm run web
```

## 📱 Testing on Devices

### Mobile Phone (iOS/Android)
1. Install **Expo Go** from the App Store/Play Store
2. Run `npm run dev` or `npm start`
3. Scan the QR code with your phone's camera
4. Tap the notification to open in Expo Go

### iOS Simulator
```bash
npm run ios
# or press 'i' in the Expo development server
```

### Android Emulator
```bash
npm run android
# or press 'a' in the Expo development server
```

### Web Browser
```bash
npm run web
# or press 'w' in the Expo development server
# Navigate to http://localhost:8081
```

## 🏗️ Project Structure

```
to-app/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based navigation
│   │   ├── index.tsx      # Main tasks screen
│   │   └── _layout.tsx    # Tab layout configuration
│   └── _layout.tsx        # Root layout
├── api/                   # API route handlers
│   └── tasks.ts          # Task CRUD operations
├── components/            # Reusable UI components
├── constants/             # App constants and colors
├── lib/                   # Utility functions
│   ├── api.ts            # API client functions
│   └── supabase.ts       # Database client
├── server/                # Express API server
│   └── index.ts          # Server entry point
├── .env                   # Environment variables
├── .env.example          # Environment template
├── babel.config.js       # Babel configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json          # Dependencies and scripts
```

## 🔧 API Endpoints

The API server provides the following endpoints:

- `GET /tasks` - Retrieve all tasks
- `POST /tasks` - Create a new task
- `PATCH /tasks` - Update task completion status
- `DELETE /tasks` - Delete a task

## 🎨 UI Theme

The app features a modern light theme with:
- Clean white backgrounds
- Dark gray text for excellent readability
- Blue accent colors for interactive elements
- Subtle shadows and rounded corners
- Responsive design for all screen sizes

## 🛠️ Technology Stack

- **Frontend**: React Native with Expo
- **Styling**: Tailwind CSS (NativeWind)
- **Backend**: Node.js with Express
- **Database**: PostgreSQL (Neon)
- **Icons**: Lucide React Native
- **Development**: TypeScript, TSX

## 🔍 Troubleshooting

### Common Issues

**1. "Failed to fetch" error on mobile**
- Ensure your `.env` file uses your computer's network IP instead of `localhost`
- Make sure both your phone and computer are on the same WiFi network
- Check that the API server is running (`npm run api`)

**2. Babel configuration errors**
- Clear Metro cache: `npx expo start --clear`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**3. Database connection issues**
- Verify your `NEON_DATABASE_URL` is correct in `.env`
- Check that the database is accessible from your network
- Ensure the database schema has been initialized

**4. Expo Go not connecting**
- Make sure you're scanning the correct QR code
- Try restarting the Expo development server
- Check that your phone and computer are on the same network

### Development Commands

```bash
# Clear all caches
npx expo start --clear
rm -rf node_modules/.cache .expo

# Reset Metro bundler
npx expo start --reset-cache

# Check for dependency issues
npm audit
npm audit fix
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEON_DATABASE_URL` | PostgreSQL connection string | `postgres://user:pass@host/db` |
| `EXPO_PUBLIC_API_URL` | API server URL for mobile access | `http://192.168.1.18:4000` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Review the Expo documentation: [docs.expo.dev](https://docs.expo.dev)
3. Check the React Native documentation: [reactnative.dev](https://reactnative.dev)
4. Open an issue in the repository

---

**Happy coding! 🚀**
