const express = require('express');
const talkerRoutes = require('./routes/talkerRoutes');
const loginRouter = require('./routes/loginRoutes');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkerRoutes);
app.use('/login', loginRouter);

app.listen(PORT, () => {
  console.log('Online');
});
