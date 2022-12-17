const tokenLenght = 16;

const generateToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  const charactersLength = characters.length;
  for (let i = 0; i < tokenLenght; i += 1) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return token;
};

module.exports = { generateToken };