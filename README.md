# QR Code Customization Website

Welcome to the QR Code Customization Website project! This web application allows users to generate and customize QR codes with various options, including text input, color, pattern, frame, and more.

## Features

- **Authentication:** Users can register and log in using email or Google authentication via Firebase.
- **Dashboard:** A user-friendly dashboard to navigate to different pages and manage QR codes.
- **QR Code Generator:** A dynamic page for generating customizable QR codes with options for:
  - Inputting text, URLs, or other content.
  - Customizing pattern, frame, color, background color, and adding logos.
  - Selecting different QR code categories like vCard, text, website, social profiles, PDFs, images, ID cards, etc.
  - Real-time display of generated QR codes with download options.
  - Limiting QR code generation to 10 codes per day.
- **Profile Page:** Displays user information and provides a logout option.

## Getting Started

### Prerequisites

- Node.js and npm should be installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/VesperAkshay/qr-code-generator
   cd qr-code-generator
   ```
2. **Install Dependencies:**

    ```bash
    npm install
    ```
### Running the Application

1. **Start the development server:**

    ```bash
    npm start
    ```

## Env template 
### Add Firebase API
```bash
REACT_APP_FIREBASE_API_KEY=""
REACT_APP_FIREBASE_AUTH_DOMAIN=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
REACT_APP_FIREBASE_APP_ID=""
REACT_APP_FIREBASE_MEASUREMENT_ID=""
```

