import { Router } from 'express';
import * as authService from '#@/modules/auth/services/index.js';
import jwt from 'jsonwebtoken';

const router = Router();

// صفحة register
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// صفحة login
router.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST register
router.post('/register', async (req, res) => {
  try {
    // Force role to 'user' and do NOT auto-login after registration.
    const { user } = await authService.registerUser(req.body);
    // After registration, render the login page with a success message.
    return res.render('login', { error: null, success: 'Account created. Please log in.' });
  } catch (err) {
    res.render('register', { error: err.message });
  }
});

// POST login
router.post('/login', async (req, res) => {
  try {
    const { user, token } = await authService.loginUser(req.body.email, req.body.password);
    res.cookie('token', token, { httpOnly: true });
    if (user.role === 'admin') return res.redirect('/admin');
    res.redirect('/');
  } catch (err) {
    res.render('login', { error: err.message });
  }
});

// GET logout
router.get('/logout', (req, res) => {
  // clear authentication cookie and redirect home
  res.clearCookie('token');
  res.redirect('/');
});

export default router;

