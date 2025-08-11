Steganography Suite
This is a web application that allows you to hide a secret message within an image using steganography. You can also decode a message from an image that has a hidden message.

Features
Encode Message: Hide a text message within an image.

Decode Message: Extract a hidden message from an image.

Fetch Random Image: Fetch a random image from an external API to use for encoding.

Image Uploader: Upload your own image for encoding or decoding.

Image Preview: See a preview of the original and encoded image.

Download Encoded Image: Download the image with the hidden message.

Technologies Used
React

Tailwind CSS

Axios

How to Run
Clone the repository:

Bash

git clone <repository-url>
Install the dependencies:

Bash

npm install
Start the development server:

Bash

npm run dev
Open your browser and navigate to http://localhost:3000

Project Structure
steganography-suite/
|-- public/
|-- src/
|   |-- assets/
|   |   `-- react.svg
|   |-- components/
|   |   |-- Button.jsx
|   |   |-- DecodeSection.jsx
|   |   |-- EncodeSection.jsx
|   |   |-- ImagePreview.jsx
|   |   |-- ImageUploader.jsx
|   |   `-- MessageInput.jsx
|   |-- context/
|   |   `-- AppContext.jsx
|   |-- utils/
|   |   `-- stego.js
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- .gitignore
|-- package.json
|-- README.md
File Descriptions
src/main.jsx: The entry point of the React application.

src/App.jsx: The main application component that sets up the layout and routing.

src/context/AppContext.jsx: Manages the application's state using React's Context API.

src/utils/stego.js: Contains the core steganography functions for encoding and decoding messages in images.

src/components/EncodeSection.jsx: The component responsible for the UI and logic of encoding a message into an image.

src/components/DecodeSection.jsx: The component responsible for the UI and logic of decoding a message from an image.

src/components/ImagePreview.jsx: A reusable component for displaying image previews.

src/components/ImageUploader.jsx: A component that allows users to upload images.

src/components/Button.jsx: A reusable button component.

src/components/MessageInput.jsx: A reusable text area for message input.
