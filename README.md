<div align="center">

<img src="path/to/your/logo.png" alt="Steganography Suite Logo" width="150"/>

# Steganography Suite

A modern web application built with React that allows you to hide secret text messages within images using LSB (Least Significant Bit) steganography. You can encode your own messages or decode messages from images that have been previously encoded.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/your-username/your-repo-name/blob/main/LICENSE)
![GitHub last commit](https://img.shields.io/github/last-commit/your-username/your-repo-name)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🖼️ Demo & Screenshots](#️-demo--screenshots)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚀 Getting Started](#-getting-started)
- [📂 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- **Encode Messages**: Hide any text message within a PNG image by modifying the least significant bits of pixels.
- **Decode Messages**: Extract hidden messages from steganographically encoded images.
- **Random Image Fetcher**: Fetch a random high-quality image online to use as a cover image.
- **Custom Image Upload**: Upload your own PNG or JPEG images for encoding/decoding.
- **Image Previews**: Preview original and encoded images instantly.
- **Download Functionality**: Save the encoded image to your device.
- **Responsive Design**: Clean, modern UI built with Tailwind CSS.
- **Error Handling**: Friendly messages for common issues (e.g., oversized messages, failed fetches).

---

## 🖼️ Demo & Screenshots

Below is a GIF demonstrating the application's core functionality.

![Steganography Suite Demo](path/to/your/demo.gif)

### Screenshots

<p align="center">
  <img src="path/to/screenshot-1.png" alt="Encode Section" width="48%">
  <img src="path/to/screenshot-2.png" alt="Decode Section" width="48%">
</p>

---

## 🛠️ Technologies Used

- **[React](https://reactjs.org/)** – UI library for building interactive interfaces.
- **[React Context API](https://reactjs.org/docs/context.html)** – State management.
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework.
- **[Axios](https://axios-http.com/)** – HTTP client for fetching random images.
- **HTML5 Canvas** – Low-level pixel manipulation for steganography.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js and npm installed:

```bash
npm install npm@latest -g
# 1. Clone the repository
git clone https://github.com/your-username/your-repo-name.git

# 2. Navigate to the project directory
cd steganography-suite

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
steganography-suite/
├── public/
├── src/
│   ├── assets/              # Static assets like SVGs
│   ├── components/          # Reusable React components
│   │   ├── Button.jsx
│   │   ├── DecodeSection.jsx
│   │   ├── EncodeSection.jsx
│   │   ├── ImagePreview.jsx
│   │   ├── ImageUploader.jsx
│   │   └── MessageInput.jsx
│   ├── context/             # React Context for state management
│   │   └── AppContext.jsx
│   ├── utils/               # Core logic and helper functions
│   │   └── stego.js
│   ├── App.jsx              # Main app component
│   ├── index.css            # Global styles & Tailwind imports
│   └── main.jsx             # Application entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md

This fixes:  
✅ Proper alignment of header & badges in the center  
✅ Clean project structure with code block formatting  
✅ Removed broken nested `|` pipes in the original  
✅ Ensured that all GitHub markdown renders correctly without HTML glitches  

If you want, I can also make you a **dark-themed README style** with gradient section titles so it looks more premium on GitHub.


