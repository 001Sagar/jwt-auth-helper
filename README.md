# jwt-auth-helper

![jwt-auth-helper Logo](https://your-website.com/your-logo.png)

`jwt-auth-helper` is your go-to npm package for effortless JWT (JSON Web Token) authentication in Node.js applications. It simplifies token generation and verification, empowering you to secure your Express.js routes seamlessly.

## Installation

Get started quickly by installing the package using npm:


npm install jwt-auth-helper


1. Import and Configure the Package:

In your Node.js application code, import the JwtAuthHelper class and configure it with your secret key and token expiration time:

const express = require('express');
const JwtAuthHelper = require('jwt-auth-helper');

// Set your secret key and token expiration time

```javascript
const secretKey = 'your-secret-key';
const tokenExpiration = '1h'; // 1 hour
const authenticator = new JwtAuthHelper(secretKey, tokenExpiration);

const app = express();
```


### Generate JWT Tokens:

`Generate JWT tokens when authenticating users or for other relevant scenarios:`
```javascript
// Example: User authentication
app.post('/login', (req, res) => {
  // Authenticate the user, e.g., by checking their credentials
  const user = { userId: 123, username: 'exampleuser' };

  // Generate a JWT token for the authenticated user
  const token = authenticator.generateToken(user);

  // Return the token to the client
  res.json({ token });
});
```

### Protect Routes with JWT Authentication:
`Protect specific routes by applying the verifyToken middleware provided by the JwtAuthHelper package:`
```javascript

// Protected route - requires a valid JWT token
app.get('/protected-route', authenticator.verifyToken, (req, res) => {
  // The user is authenticated, and their information is available in req.user
  const userId = req.user.userId;
  res.json({ message: `Authenticated user with ID ${userId}` });
});
```



### Start the Express.js Server:

`Start your Express.js server to handle incoming HTTP requests:`
```javascript
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```


### Configuration Options
`secretKey: Your secret key used for JWT token signing.` 
`tokenExpiration: The token expiration time (e.g., '1h' for 1 hour).`

## License

node-cron is under [ISC License](https://github.com/001Sagar/jwt-auth-helper/blob/master/LICENSE.md).
