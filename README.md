# 3D Homepage

A modern, interactive 3D homepage built with React, Three.js, and React Three Fiber. Create your personalized 3D space with floating portals to your favorite websites.

## Features

- 🎮 **First-person navigation** - Move around with WASD or arrow keys
- 🌐 **Interactive portals** - Click floating objects to visit your bookmarked sites
- 🎨 **Modern 3D graphics** - Built with Three.js and React Three Fiber
- 📱 **Responsive design** - Works on desktop and mobile devices
- 🌍 **Multi-language support** - English and Polish translations
- ⚡ **Fast loading** - Optimized with Vite for quick development and builds

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd 3d-homepage
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Configuration**: On first visit, you'll see a configuration form where you can:
   - Choose from popular websites
   - Add custom URLs and titles
   - Switch between English and Polish

2. **3D Scene**: After configuration, you'll enter the 3D environment where you can:
   - Move around using WASD or arrow keys
   - Look around by moving your mouse
   - Click on floating portals to visit websites

3. **Bookmark**: Add the generated URL to your bookmarks or set it as your homepage

## Controls

- **Movement**: WASD or Arrow Keys
- **Look around**: Mouse movement
- **Interact**: Click on floating objects
- **Vertical movement**: R (up) / F (down)

## Technology Stack

- **React 18** - Modern React with hooks and concurrent features
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
src/
├── components/          # React components
│   ├── Scene3D.jsx     # Main 3D scene
│   ├── ConfigForm.jsx  # Configuration interface
│   ├── Environment3D.jsx # 3D environment elements
│   ├── LinkPortals.jsx # Interactive website portals
│   └── AnimatedObjects.jsx # Animated 3D objects
├── controls/           # Input controls
│   └── FirstPersonControls.js # First-person camera controls
├── hooks/              # Custom React hooks
│   └── useLanguage.js  # Language switching logic
├── App.jsx            # Main application component
└── main.jsx           # Application entry point
```

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting: `npm run lint`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).