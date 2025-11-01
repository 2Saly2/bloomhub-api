import jwt from 'jsonwebtoken';
import User from '#@/modules/auth/model/index.js';

// Populate req.user and res.locals.user from token cookie (if present).
// This middleware is non-fatal: if token is missing/invalid we simply continue.
export const populateUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      // ensure templates see a defined `user` variable (null for guests)
      res.locals.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.locals.user = null;
      return next();
    }

    req.user = user;
    res.locals.user = user;
    return next();
  } catch (err) {
    // silently ignore token errors (user will be treated as guest)
    res.locals.user = null;
    return next();
  }
};

export default populateUser;
