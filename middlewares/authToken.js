

export default function authenticateToken(req, res, next) {
  const API_TOKEN = process.env.ACCESS_TOKEN || "default-token";
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  if (token !== `Bearer ${API_TOKEN}`) {
    return res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }

  next();
}