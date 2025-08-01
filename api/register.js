export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    // Perform validation, hashing, saving, etc.
    return res.status(200).json({ message: 'User registered!' });
  }
  res.status(405).json({ error: 'Method not allowed' });
}
