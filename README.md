# Session Cookie Authentication Project

A Node.js Express application demonstrating session-based authentication with MongoDB storage using cookies.

## Features

- User registration and login
- Password hashing with bcryptjs
- Session management with express-session
- MongoDB session storage with connect-mongo
- Signed cookies for additional security
- RESTful API endpoints for authentication

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **express-session** - Session middleware
- **connect-mongo** - MongoDB session store
- **bcryptjs** - Password hashing
- **cookie-parser** - Cookie parsing middleware

## Project Structure

```
Session_Cookie/
├── server.js          # Main application file
├── package.json       # Dependencies and scripts
├── models/
│   └── User.js        # User model with password hashing
├── routes/
│   └── auth.js        # Authentication routes
└── README.md          # Project documentation
```

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- MongoDB (running locally on default port 27017)
- npm or yarn package manager

## Installation

1. Clone or download the project
2. Navigate to the project directory:
   ```bash
   cd Session_Cookie
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

The application uses the following default configurations:

- **MongoDB URL**: `mongodb://127.0.0.1:27017/authdb`
- **Server Port**: `3000`
- **Session Secret**: `supersecret` (hardcoded for development)
- **Cookie Max Age**: 1 hour (3600000 ms)

## Running the Application

1. Make sure MongoDB is running on your local machine
2. Start the server:
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```
3. The server will start on `http://localhost:3000`

## API Endpoints

### Authentication Routes

All authentication routes are prefixed with `/auth`:

#### Register User
- **POST** `/auth/register`
- **Body**:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response**: Success message or error

#### Login User
- **POST** `/auth/login`
- **Body**:
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response**: Success message or error
- **Side Effects**: 
  - Creates session with userId
  - Sets signed cookie with user ID

#### Logout User
- **POST** `/auth/logout`
- **Response**: Success message or error
- **Side Effects**: 
  - Destroys session
  - Clears session cookie

## Session Management

The application implements session management with the following features:

- **Session Storage**: MongoDB using connect-mongo
- **Session Security**: HttpOnly cookies, configurable secure flag
- **Session Duration**: 1 hour by default
- **Additional Security**: Signed cookies with cookie-parser

## Security Features

1. **Password Hashing**: Passwords are hashed using bcryptjs with salt rounds of 10
2. **Session Security**: Sessions are stored securely in MongoDB
3. **Cookie Security**: HttpOnly flag prevents XSS attacks
4. **Signed Cookies**: Additional layer of security with signed cookies

## Development Notes

- The session secret is hardcoded for development purposes
- Secure cookie flag is set to `false` for HTTP development
- MongoDB connection uses local instance without authentication

## Production Considerations

For production deployment, consider:

1. Use environment variables for sensitive configuration
2. Enable HTTPS and set `cookie.secure` to `true`
3. Use a strong, randomly generated session secret
4. Implement proper error handling and logging
5. Add input validation and sanitization
6. Configure MongoDB with authentication
7. Implement rate limiting for authentication endpoints

## Testing

You can test the API endpoints using tools like:
- Postman
- curl
- Thunder Client (VS Code extension)

Example curl commands:

```bash
# Register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}' \
  -c cookies.txt

# Logout
curl -X POST http://localhost:3000/auth/logout \
  -b cookies.txt
```

## License

ISC

## Author

Lab05 - Session Cookie Authentication Demo