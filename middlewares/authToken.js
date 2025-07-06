

export default function authenticateToken(req, res, next) {
    const API_TOKEN = process.env.ACCESS_TOKEN || "default-token";
    const token = req.headers['authorization'];

  console.log('Received token:', token);
  console.log('local token', API_TOKEN)

  if (!token) {
    console.warn('No Authorization header sent');
    return res.status(403).json({ error: 'No token provided' });
  }

  if (token !== `Bearer ${API_TOKEN}`) {
    console.warn('Invalid token:', token);
    return res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }

  console.log('Token validated successfully');
  next();
}