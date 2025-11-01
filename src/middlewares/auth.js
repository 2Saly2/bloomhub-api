import jwt from 'jsonwebtoken';
import User from '#@/modules/auth/model/index.js';

export const auth = async (req, res, next) => {
  try {
    // Support token in Authorization header OR cookie (so browser fetch() from pages works)
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) return res.status(401).json({ error: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = user; 
    next();
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized', message: err.message });
  }
};
