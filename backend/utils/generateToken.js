import jwt from 'jsonwebtoken';
const generateToken = (res, user) => {
  const token = jwt.sign({ id: user._id, shop: user?.shop, branch:user.branch }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: false,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    // sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
  return token;
};
export default generateToken;
