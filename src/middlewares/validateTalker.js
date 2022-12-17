const verifyName = (name) => {
  if (!name) {
    throw new Error('O campo "name" é obrigatório');
  }
  if (name.length === 0) {
    throw new Error('O campo "name" é obrigatório');
  }
  if (name.length < 3) {
    throw new Error('O "name" deve ter pelo menos 3 caracteres');
  }
};

const verifyAge = (age) => {
  if (!age) {
    throw new Error('O campo "age" é obrigatório');
  }
  if (age < 18) {
    throw new Error('A pessoa palestrante deve ser maior de idade');
  }
};

const verifyWatchedAt = (watchedAt) => {
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const testedDate = dateRegex.test(watchedAt);
  if (!testedDate) {
    throw new Error('O campo "watchedAt" deve ter o formato "dd/mm/aaaa"');
  }
};

const verifyRate = (rate) => {
  if (Number(rate) < 1 || Number(rate) > 5 || !Number.isInteger(rate)) {
    throw new Error('O campo "rate" deve ser um inteiro de 1 à 5');
  }
};

const verifyTalk = (talk) => {
  if (!talk) {
    throw new Error('O campo "talk" é obrigatório');
  }
  if (!talk.watchedAt) {
    throw new Error('O campo "watchedAt" é obrigatório');
  }
  if (!talk.rate && talk.rate !== 0) {
    throw new Error('O campo "rate" é obrigatório');
  }
  const { watchedAt, rate } = talk;
  verifyWatchedAt(watchedAt);
  verifyRate(rate);
};

const validateTalker = (req, res, next) => {
  try {
    const { name, age, talk } = req.body;
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    if (authorization.length !== 16 || typeof (authorization) !== 'string') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    verifyName(name);
    verifyAge(age);
    verifyTalk(talk);
    next();
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = validateTalker;
