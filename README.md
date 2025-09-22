# 🔐 StegoHide: A React-Based Steganography Tool

<div align="center">

**Hide your secret messages in plain sight. This tool uses Least Significant Bit (LSB) steganography to embed text within images, with an optional layer of XOR encryption for robust security.**

</div>

---

### Table of Contents

-   [✨ Features](#-features)
-   [🛠️ Tech Stack](#-tech-stack)
-   [🚀 Getting Started](#-getting-started)
-   [🔧 Usage](#-usage)
-   [📜 License](#-license)

---

## ✨ Features

-   **Effective LSB Steganography**: Securely embeds messages directly into the pixel data of an image, ensuring they are visually undetectable.
-   **Optional XOR Encryption**: Provides an additional security layer by encrypting messages with a secret key *before* they are hidden in the image.
-   **Intuitive Dual-Panel UI**: A clean and modern interface with dedicated panels for both encoding and decoding operations, making the process straightforward.
-   **Flexible Image Handling**: Gives you the choice to either upload your own local images or fetch a random image from an online source to use for encoding.
-   **Live Image Previews**: Instantly view both your original and the newly encoded images side-by-side to confirm the process was successful.
-   **Message Size Limiter**: A helpful character counter provides real-time feedback to ensure that your secret message will fit within the capacity of the selected image.

---

## 🛠️ Tech Stack

This project is built with a modern frontend stack:

-   **[React.js](https://reactjs.org/)**: A JavaScript library for building user interfaces.
-   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
-   **[React Context API](https://reactjs.org/docs/context.html)**: Used for efficient and clean state management across the application.

---

## 🚀 Getting Started

To get a local copy of StegoHide up and running, please follow these simple steps.

### Prerequisites

Ensure you have **Node.js** (which includes npm) installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1.  **Clone the repository to your local machine:**
    ```sh
    git clone [https://github.com/your-username/stegohide.git](https://github.com/your-username/stegohide.git)
    ```

2.  **Navigate into the project directory:**
    ```sh
    cd stegohide
    ```

3.  **Install the required NPM packages:**
    ```sh
    npm install
    ```

4.  **Run the application in development mode:**
    ```sh
    npm run dev
    ```
    Once running, open your browser and navigate to `http://localhost:5173` to see the application live.

---

## 🔧 Usage

The application is divided into two main functions: hiding a message and revealing a message.

### To Hide a Message (Encode)

1.  Select the **Hide Message** tab from the sidebar.
2.  Type your secret message in the provided text area.
3.  **(Optional but Recommended)** Enter a secret key to encrypt your message.
4.  Load an image by either clicking **🎲 Random** or **📁 Upload Image**.
5.  Click the **📝 Hide** (or **🔐 Encrypt**) button to embed the message.
6.  Your new, encoded image will appear in the "Encoded" preview box. Click **📥 Download** to save it.

### To Reveal a Message (Decode)

1.  Select the **Reveal Message** tab from the sidebar.
2.  If the original message was encrypted, you **must** enter the same secret key used to encode it.
3.  Click **📁 Upload Image** and select the image that contains the hidden message.
4.  Click the **剥 Decode** button to extract the message.
5.  The hidden message will be displayed in the results area below.

---

## 📜 License

This project is distributed under the MIT License. See the `LICENSE` file for more information.
