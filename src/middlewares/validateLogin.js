const passwordLength = 6;

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    throw new Error('O campo "email" é obrigatório');
  }
  if (!emailRegex.test(email)) {
    throw new Error('O "email" deve ter o formato "email@email.com"');
  }
};

const validatePassword = (password) => {
  if (!password) {
    throw new Error('O campo "password" é obrigatório');
  }
  if (password.length < passwordLength) {
    throw new Error('O "password" deve ter pelo menos 6 caracteres');
  }
};

const validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    validateEmail(email);
    validatePassword(password);
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = validateLogin;
