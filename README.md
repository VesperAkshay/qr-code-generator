# QR Code Customization Website

Welcome to the QR Code Customization Website project! This web application allows users to generate and customize QR codes with various options, including text input, color, pattern, frame, and more.

## Table of Contents
   1. [Features](#features)
   2. [Technologies Used](#technologies-used)
   3. [Contributing](#contributing)
   4. [Installation Guide](#installation-guide)
   5. [Getting Started](#getting-started)
   6. [FAQ](#faq)

## Features

- **User Authentication:** Securely register and log in with *email* or *Google authentication* powered by Firebase. .
- **Dashboard:**
  A user-friendly dashboard to navigate to different pages. From the dashboard, users can manage their *QR code history*, access the *QR Code Generator*, and view their *profile* details. 
- **QR Code Generator:** A dynamic page for generating customizable QR codes with options for:
  - *Input content* like text, URLs, or other media for their QR codes.
  - Customize the *pattern*, *frame*, *foreground* and *background colors*, and even add logos to personalize the QR code design.
  - Selecting different *QR code categories* like *vCard*, *text*, *website*, *social profiles*, *PDFs*, *images*, *ID cards*, etc.
  - *Real-time display* feature shows the QR code as it's being customized, allowing users to make adjustments instantly before downloading.
  - Limiting QR code generation to **10 codes per day**.
- **Profile Page:** Displays their *account information*, including their *name*, *email*, and associated authentication methods. The page also features a secure *logout* option.

  
## Technologies Used

- **Front-end:** HTML, CSS, JavaScript, Bootstrap for a responsive design.
- **Back-end:** Node.js, Express for server-side logic.
- **Database:** Firebase for authentication and user data storage.
- **QR Code Generation:** QR Code API (e.g., QRCode.js, or other libraries).
- **Hosting:** Deployed on platforms such as Firebase Hosting or Heroku.

## Contributing

We welcome contributions from the open-source community! If you'd like to contribute:

1. Fork the repository.
2. Create a new feature branch *(git checkout -b feature/your-feature).*
3. Commit your changes *(git commit -m 'Add some feature').*
4. Push to the branch *(git push origin feature/your-feature).*
5. Open a Pull Request.


## Installation Guide

#### PrePrerequisites
Before installing the project locally, ensure you have the following installed:

- **Node.js:** JavaScript runtime for back-end development.
- **Git:** Version control system for cloning the repository.
- **Firebase CLI:** For managing Firebase services.
- **Any Web Browser:** For accessing the website.

#### Steps to Install
1. **Clone the Repository:**

```bash
git clone https://github.com/your-username/qr-code-customization-website.git
cd qr-code-customization-website

```
2. **Install Dependencies:** Install all the required packages and dependencies using npm:

```bash
npm install

```
3. **Configure Firebase:**

- Create a Firebase project and enable authentication and database services.
- Add Firebase credentials to your project (Firebase config keys).
    


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
## FAQ

#### Q: Can I use the generated QR codes for commercial purposes?

A: Yes, you are free to use the generated QR codes for both personal and commercial purposes.

#### Q: How do I add a logo to my QR code?

A: During the customization process, click on the Add Logo button and upload your image file. The logo will be placed in the center of the QR code.

#### Q: What formats can I download the QR codes in?

A: Yes, you are free to use the generated QR codes for both personal and commercial purposes.
