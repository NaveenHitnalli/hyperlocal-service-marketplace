


// // module.exports = authMiddleware;


// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const auth = req.headers.authorization || ''; // e.g. 'Bearer abc.def.ghi'
//   const token = auth.startsWith('Bearer ')
//     ? auth.split(' ')[1]
//     : auth; // fallback if client sends token without Bearer

//   if (!token) return res.status(401).json({ error: 'No token provided' });

//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };
// Import the JSON Web Token library to handle token verification
const jwt = require('jsonwebtoken');

// Export a middleware function for Express.js
module.exports = (req, res, next) => {
  // Get the authorization header (e.g., 'Bearer abc.def.ghi') or set it to an empty string if not provided
  const auth = req.headers.authorization || '';

  // Extract the token from the header.
  // If it starts with 'Bearer ', split and take the token part only.
  // Else fallback to use the full auth string (for flexibility).
  const token = auth.startsWith('Bearer ')
    ? auth.split(' ')[1]
    : auth;

  // If no token is found, return 401 Unauthorized error
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    // Verify the token using the secret key from environment variables
    // If successful, the decoded user data will be stored in req.user
    req.user = jwt.verify(token, process.env.JWT_SECRET);

    // Call next() to pass control to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails (e.g. invalid/expired), return 401 error
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
