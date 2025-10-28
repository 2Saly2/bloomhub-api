export function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' });
  }
  next();
}

export function isMember(req, res, next) {
  if (req.user.role !== 'member') {
    return res.status(403).json({ error: 'Forbidden: Members only' });
  }
  next();
}


export function permitRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient role' });
    }
    next();
  };
}
