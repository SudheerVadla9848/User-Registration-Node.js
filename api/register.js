// api/register.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGODB_URI);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    // Save to DB logic
    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
