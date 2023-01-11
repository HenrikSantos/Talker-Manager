const { expect } = require('chai');
const { generateToken } = require('../src/utils/generateToken');

describe('testa a função generateToken', function () {
  it('testa se o token retornado possui o tamanho igual a 16', function () {
    const token = generateToken();
    expect(token.length).equal(16);
  });
});