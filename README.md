# Node.js URL Shortener

This is a simple URL shortener application built with Node.js, Express, MongoDB, and EJS.

## Features

- Shorten long URLs
- Redirect to the original URL using the shortened URL
- Track visit history for each shortened URL
- User authentication and authorization

## Prerequisites

- Node.js
- MongoDB

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=8001
   JWT_SECRET=your_jwt_secret
   ```

4. Start the MongoDB server:
   ```sh
   mongod
   ```

5. Start the application:
   ```sh
   npm start
   ```

6. Open your browser and navigate to `http://localhost:8001`.

## Usage

- To shorten a URL, navigate to the home page and enter the long URL.
- To access the original URL, use the shortened URL provided.
- User authentication is required for certain routes.

## Project Structure

- `index.js`: Entry point of the application
- `service/auth.js`: Authentication service for JWT
- `models/url.js`: Mongoose model for URL
- `routes/`: Contains route handlers
- `middlewares/auth.js`: Middleware for authentication and authorization
- `views/`: Contains EJS templates

## License

This project is licensed under the MIT License.
