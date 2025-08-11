<div align="center">
  <img src="https://via.placeholder.com/150x150/4f46e5/ffffff?text=STEGO" alt="Steganography Suite Logo" width="150"/>
  
  # 🕵️ Steganography Suite
  
  <p align="center">
    <strong>A modern web application for hiding and extracting secret messages within images using advanced LSB steganography techniques.</strong>
  </p>
  
  <p align="center">
    <a href="#"><img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg"/></a>
    <a href="#"><img alt="React" src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react"/></a>
    <a href="#"><img alt="Vite" src="https://img.shields.io/badge/Vite-4.4.0-646CFF?logo=vite"/></a>
    <a href="#"><img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-3.3.0-38B2AC?logo=tailwind-css"/></a>
    <a href="#"><img alt="Build Status" src="https://img.shields.io/badge/build-passing-brightgreen"/></a>
  </p>
  
  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-quick-start">Quick Start</a> •
    <a href="#-screenshots">Screenshots</a> •
    <a href="#-api-reference">API</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>

---

## 🌟 Features

### 🔐 **Steganography Operations**
- **📝 Message Encoding**: Hide text messages up to 1000 characters within images using LSB (Least Significant Bit) technique
- **🔍 Message Decoding**: Extract hidden messages from steganographic images
- **🖼️ Multi-format Support**: Works with PNG, JPEG, and other common image formats
- **🔒 Secure Encoding**: Uses delimiter-based message termination for reliable extraction

### 🎨 **User Interface**
- **🌙 Dark Theme**: Modern, eye-friendly dark interface
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **⚡ Real-time Preview**: Instant image previews with loading states and error handling
- **💾 Download Support**: One-click download of encoded images

### 🚀 **Advanced Features**
- **🎲 Random Image Fetcher**: Get random images from multiple APIs (Picsum, Unsplash)
- **📤 File Upload**: Drag-and-drop or click to upload local images
- **🔄 Fallback Systems**: Multiple image sources with automatic fallback
- **🛡️ CORS Handling**: Robust cross-origin resource sharing support
- **📊 Debug Tools**: Built-in image comparison and analysis tools

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 16.0.0
- **npm** >= 8.0.0 or **yarn** >= 1.22.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/steganography-suite.git
   cd steganography-suite
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (Vite default port)

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to static hosting (Netlify, Vercel, etc.)
npm run deploy
```

---

## 📦 Dependencies

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.2.0 | Core React library |
| `react-dom` | ^18.2.0 | React DOM renderer |
| `axios` | ^1.5.0 | HTTP client for API requests |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@types/react` | ^18.2.15 | TypeScript types for React |
| `@types/react-dom` | ^18.2.7 | TypeScript types for React DOM |
| `@vitejs/plugin-react` | ^4.0.3 | Vite React plugin |
| `autoprefixer` | ^10.4.14 | PostCSS autoprefixer |
| `eslint` | ^8.45.0 | JavaScript/React linting |
| `eslint-plugin-react` | ^7.32.2 | React-specific linting rules |
| `eslint-plugin-react-hooks` | ^4.6.0 | React Hooks linting rules |
| `eslint-plugin-react-refresh` | ^0.4.3 | React Refresh linting |
| `postcss` | ^8.4.27 | CSS post-processor |
| `tailwindcss` | ^3.3.0 | Utility-first CSS framework |
| `vite` | ^4.4.5 | Next-generation frontend tooling |

### Installation Commands

```bash
# Install all dependencies at once
npm install react react-dom axios

# Install dev dependencies
npm install -D @vitejs/plugin-react @types/react @types/react-dom
npm install -D tailwindcss postcss autoprefixer
npm install -D eslint eslint-plugin-react eslint-plugin-react-hooks
npm install -D vite
```

---

## 🖼️ Screenshots

<div align="center">
  <img src="https://via.placeholder.com/800x400/1f2937/ffffff?text=Main+Interface" alt="Main Interface" width="800"/>
  <p><em>Main steganography interface with dark theme</em></p>
</div>

<div align="center">
  <img src="https://via.placeholder.com/800x400/374151/ffffff?text=Encoding+Process" alt="Encoding Process" width="800"/>
  <p><em>Message encoding with real-time preview</em></p>
</div>

<div align="center">
  <img src="https://via.placeholder.com/800x400/111827/ffffff?text=Mobile+View" alt="Mobile Interface" width="400"/>
  <p><em>Responsive mobile interface</em></p>
</div>

---

## 🏗️ Project Structure

```
steganography-suite/
├── 📁 public/
│   ├── vite.svg
│   └── favicon.ico
├── 📁 src/
│   ├── 📁 components/
│   │   ├── ImagePreview.jsx      # Image display component
│   │   ├── MessageInput.jsx      # Text input component
│   │   ├── ControlPanel.jsx      # Action buttons
│   │   └── StatusIndicator.jsx   # Loading/error states
│   ├── 📁 context/
│   │   └── AppContext.jsx        # Global state management
│   ├── 📁 utils/
│   │   ├── stego.js             # Core steganography algorithms
│   │   ├── imageUtils.js        # Image processing utilities
│   │   └── validation.js        # Input validation
│   ├── 📁 hooks/
│   │   ├── useImageUpload.js    # Image upload logic
│   │   └── useLocalStorage.js   # Persistent storage
│   ├── 📁 styles/
│   │   ├── index.css           # Global styles
│   │   └── components.css      # Component-specific styles
│   ├── App.jsx                 # Main application component
│   └── main.jsx               # Application entry point
├── 📄 package.json            # Project dependencies
├── 📄 tailwind.config.js      # Tailwind CSS configuration
├── 📄 vite.config.js         # Vite build configuration
├── 📄 postcss.config.js      # PostCSS configuration
├── 📄 .eslintrc.cjs          # ESLint configuration
└── 📄 README.md              # This file
```

---

## 🛠️ Technologies Used

### Frontend Framework
- **⚛️ React 18** - Modern React with Concurrent Features
- **🏗️ Vite** - Lightning-fast build tool and dev server
- **🎨 Tailwind CSS** - Utility-first CSS framework

### Core Libraries
- **🌐 Axios** - Promise-based HTTP client
- **🖼️ Canvas API** - Native image manipulation
- **📱 Progressive Web App** - Installable web application

### Development Tools
- **🔍 ESLint** - Code linting and formatting
- **🚀 Hot Module Replacement** - Instant development feedback
- **📦 ES Modules** - Modern JavaScript module system

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_PICSUM_API=https://picsum.photos
VITE_UNSPLASH_API=https://source.unsplash.com
VITE_MAX_MESSAGE_LENGTH=1000

# App Configuration
VITE_APP_NAME=Steganography Suite
VITE_APP_VERSION=1.0.0
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
        }
      }
    },
  },
  plugins: [],
}
```

---

## 📚 API Reference

### Core Functions

#### `encodeMessage(imageSrc, message)`
Encodes a secret message into an image using LSB steganography.

**Parameters:**
- `imageSrc` (string): Image URL or data URL
- `message` (string): Secret message (max 1000 characters)

**Returns:** Promise resolving to encoded image data URL

#### `decodeMessage(imageSrc)`
Extracts a hidden message from a steganographic image.

**Parameters:**
- `imageSrc` (string): Encoded image URL or data URL

**Returns:** Promise resolving to extracted message string

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

---

## 🚀 Deployment

### Static Hosting (Recommended)

**Vercel:**
```bash
npm i -g vercel
vercel --prod
```

**Netlify:**
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

**GitHub Pages:**
```bash
npm run build
npm run deploy
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **🌐 Live Demo**: [steganography-suite.vercel.app](https://steganography-suite.vercel.app)
- **📖 Documentation**: [docs.steganography-suite.com](https://docs.steganography-suite.com)
- **🐛 Issues**: [GitHub Issues](https://github.com/yourusername/steganography-suite/issues)
- **💬 Discussions**: [GitHub Discussions](https://github.com/yourusername/steganography-suite/discussions)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/yourusername">Your Name</a></p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
