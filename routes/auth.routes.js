const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const router = Router();


// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Wrong email').isEmail(),
    check('password', 'Password must be minimum 6 symbols').isLength({ min: 6 })
  ],
  async (request, response) => {
    try {
      console.log('Body:::', request.body);

      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).json({
          errors: errors.array(),
          message: 'Wrong data for registrations'
        })
      }

      const { email, password } = request.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return response.status(400).json({ message: 'This user already registered' });
      }

      const hashPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashPassword });

      await user.save();

      response.status(201).json({ message: 'User has been created' });

    } catch (e) {
      response.status(500).json({ message: `Something wrong, try again, ${e}` });
    }
});

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Enter the correct email').normalizeEmail().isEmail(),
    check('password', 'Enter the password' ).exists()
  ],
  async (request, response) => {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return result.status(400).json({
          errors: errors.array(),
          message: 'Wrong data for login'
        })
      }

      const { email, password } = request.body;
      const user = await User.findOne({ email });

      if (!user) {
        return response.status(400).json('User not found');
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return response.status(400).json('Password is wrong, try again');
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      );

      response.json({ token, userId: user.id });

    } catch (e) {
      response.status(500).json({ message: 'Something wrong, try again' });
    }
});


module.exports = router;
