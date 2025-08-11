<div align="center">

  # Steganography Suite

  <p>
    A modern web application built with React that allows you to hide secret text messages within images using LSB (Least Significant Bit) steganography. You can encode your own messages or decode messages from images that have been previously encoded.
  </p>

  <p>
    <a href="https://github.com/your-username/your-repo-name/blob/main/LICENSE">
      <img alt="License" src="https://img.shields.io/badge/license-MIT-blue.svg"/>
    </a>
    <a href="https://github.com/your-username/your-repo-name">
      <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/your-username/your-repo-name">
    </a>
    <a href="#">
      <img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
    </a>
    <a href="#">
      <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
    </a>
  </p>
</div>

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [🚀 Getting Started](#-getting-started)

---

## ✨ Features

* **Encode Messages**: Hide any text message within a PNG image. The message is embedded by modifying the least significant bits of the image's pixels.
* **Decode Messages**: Extract hidden messages from steganographically encoded images.
* **Random Image Fetcher**: Don't have an image? Fetch a random high-quality image from an online service to use as a cover image.
* **Custom Image Upload**: Upload your own images (PNG, JPEG) to use for encoding or decoding.
* **Image Previews**: Instantly see a preview of your original image and the newly encoded image.
* **Download Functionality**: Download the encoded image to your device to share it.
* **Responsive Design**: A clean, modern, and fully responsive user interface that works on all screen sizes, built with Tailwind CSS.
* **Error Handling**: User-friendly error messages for common issues like messages being too long or failed image fetches.

---


## 🛠️ Technologies Used

This project is built with a modern frontend stack:

* **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
* **[React Context API](https://reactjs.org/docs/context.html)**: Used for robust state management across the application.
* **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
* **[Axios](https://axios-http.com/)**: A promise-based HTTP client for making requests to fetch random images.
* **HTML5 Canvas**: Used for the low-level pixel manipulation required for steganography.

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
* **npm**
    ```bash
    npm install npm@latest -g
    ```

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd steganography-suite
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

---


