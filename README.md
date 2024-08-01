# Wallet Next.js Example

This project is a Next.js example application demonstrating the use of the zbyte wallet SDK. It showcases how to integrate blockchain-based payments, deploy and invoke smart contracts, and convert tokens using the zbyte wallet SDK.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Node.js Version](#nodejs-version)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20.15.0 or lower)
- [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) for managing Node.js versions

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/wallet-nextjs-example.git
   cd wallet-nextjs-example

2. Use nvm to ensure you're using the correct Node.js version:

    nvm use

3. Install the depencies:

    npm install

### Usage

1. Ensure the provided .env file is in the root directory.

2. Start the development server:

    npm run dev

3. Open your browser and navigate to http://localhost:3000 to see the application.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the application in production mode.
- `npm run lint`: Runs the linter to check for code quality issues.

## Project Structure

- `components/`: React components used in the application.
- `contexts/`: Context providers for managing state.
- `pages/`: Next.js pages.
- `public/`: Public assets like images.
- `styles/`: Global and component-specific styles.
- `types/`: TypeScript types.
- `utils/`: Utility functions.

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
