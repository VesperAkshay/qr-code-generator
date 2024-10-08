<a id="top"></a>
<div align="center">
  <img src="https://github.com/user-attachments/assets/f60e197d-8113-47fb-b5d6-be955fc3a94b" alt="image" width="100"/>
</div>
<h1 align="center">QR Code Generator</h1>
<h3 align="center">
   Welcome to the QR Code Generator Website project! This web application allows users to generate and customize QR codes with various options, including text input, color, pattern, frame, and more.
</h3>

<hr/>

## 📈 GitHub Repository Stats
| 🌟 **Stars** | 🍴 **Forks** | 🐛 **Issues** | 🔔 **Open PRs** | 🔕 **Closed PRs** | ✅ **Contributors** |
|--------------|--------------|---------------|-----------------|------------------|------------------|
| ![GitHub stars](https://img.shields.io/github/stars/VesperAkshay/qr-code-generator) | ![forks](https://img.shields.io/github/forks/VesperAkshay/qr-code-generator) | ![issues](https://img.shields.io/github/issues/VesperAkshay/qr-code-generator?color=32CD32) | ![pull requests](https://img.shields.io/github/issues-pr/VesperAkshay/qr-code-generator?color=FFFF8F) | ![Closed PRs](https://img.shields.io/github/issues-pr-closed/VesperAkshay/qr-code-generator?color=20B2AA) | ![Contributors](https://img.shields.io/github/contributors/VesperAkshay/qr-code-generator?color=00FA9A) |

<details>
  <summary><h2>:pushpin:Table of Contents: </h2></summary>

   1. [Features](#features)
   2. [Technologies Used](#technologies-used)
   3. [Contributing](#contributing)
   4. [Installation Guide](#installation-guide)
   5. [Getting Started](#getting-started)
   6. [FAQ](#faq)
   7. [Contact](#contact)
   8. [Code of Conduct](#code-of-conduct)
</details>
<hr>


## 🪄 Features

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

  
## <div>
<h2><img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/High%20Voltage.png" alt="High Voltage" width="35" height="35" /> Technologies Used</h2>
</div>

- **Front-end:** HTML, CSS, JavaScript, Bootstrap for a responsive design.
- **Back-end:** Node.js, Express for server-side logic.
- **Database:** Firebase for authentication and user data storage.
- **QR Code Generation:** QR Code API (e.g., QRCode.js, or other libraries).
- **Hosting:** Deployed on platforms such as Firebase Hosting or Heroku.

<hr>

## ✨Contributing

We welcome all the contributions from the open-source community! If you'd like to contribute follow these steps:

1. Fork the repository.
2. Create a new feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request.

We welcome all contributions to improve **QR Code Generator**! If you'd like to contribute, please follow the [Contributing.md](./Contributing.md) to get details on how to get started.

   
To maintain quality and consistency, please adhere to the following guidelines:
1. Code Style: Follow the coding style used throughout the project. Clean, readable code with comments is always appreciated.
2. Commits: Write meaningful commit messages.
3. Pull Requests: Make sure PRs are focused, well-explained, and reference any issues they address.
4. Testing: Ensure that your changes are well-tested locally and don’t break existing functionality.

<hr>

 <details>
   <summary><h2>Installation Guide ⚡️</h2></summary>
    
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

  </details>

<hr>


## ⚡️Getting Started

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
### Add Firebase API (from .env.sample)
```bash
REACT_APP_FIREBASE_API_KEY=""
REACT_APP_FIREBASE_AUTH_DOMAIN=""
REACT_APP_FIREBASE_PROJECT_ID=""
REACT_APP_FIREBASE_STORAGE_BUCKET=""
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=""
REACT_APP_FIREBASE_APP_ID=""
REACT_APP_FIREBASE_MEASUREMENT_ID=""
```

## Firebase setup![image](https://github.com/user-attachments/assets/026e6976-21e1-44b7-9aa5-b1e0e9e38078)
1. Visit [Firebase](https://firebase.google.com/)  and navigate to the Firebase console.
2. Click "Get started with Firebase" and create a new project.
3. In the left sidebar under the "Build" section, select "Authentication." Enable Email/Password as a sign-in method.
4. From the project overview, go to "Project settings."
5. Scroll down and create a web app for the project. Register the app by following the provided instructions.
All KEY values for .env will be available while creating the project app.


<hr>


 <details>
    
   <summary><h2>✍️FAQ</h2></summary>

#### Q: Can I use the generated QR codes for commercial purposes?

A: Yes, you are free to use the generated QR codes for both personal and commercial purposes.

#### Q: How do I add a logo to my QR code?

A: During the customization process, click on the Add Logo button and upload your image file. The logo will be placed in the center of the QR code.

#### Q: What formats can I download the QR codes in?

A: Yes, you are free to use the generated QR codes for both personal and commercial purposes.

</details>

<hr>

## ⚡Contact 
[![My Discord (YOURUSERID)](https://img.shields.io/badge/My-Discord-%235865F2.svg)](https://discord.com/users/akshaypatell_)

For Queries and issue related question you can contact me on Discord

*Discord Username:* akshaypatell_


## 👥 Team

| ![Akshay Patel](https://avatars.githubusercontent.com/u/118452811?v=4&s=80)|
|:--:|
| **Akshay Patel** <br> <sub>Project Admin</sub> | 
| [![LinkedIn](https://img.icons8.com/fluency/32/000000/linkedin.png)](https://www.linkedin.com/in/akshay-patel-3b0b97284/) | 

## 🪄Code of conduct

Want to be part of the community? Check out our **[Code of Conduct](https://github.com/VesperAkshay/qr-code-generator/blob/main/Code_Of_Conduct.md)**


<hr>
<div>
  <h2><img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f64f_1f3fb/512.webp" width="35" height="35"> Support </h2>
</div>

## Meet Our Wonderful Contributors

💝 Thank you to all the amazing contributors who have made this project possible! 💝

<a href="https://github.com/VesperAkshay/qr-code-generator/graphs/contributors">
  <img align="center" src="https://contrib.rocks/image?max=100&repo=VesperAkshay/qr-code-generator" />
</a> 
<br>
<div>
  Don't forget to leave a star<img src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f31f/512.webp" width="35" height="30"> for this project!
</div> <br>

<a href="#top" style="position: fixed; bottom: 20px; right: 20px; background-color: black ; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px; font-family: Arial; font-size: 16px;">Go to Top</a>
