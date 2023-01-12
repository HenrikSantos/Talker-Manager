const { expect } = require('chai');
const {
  getTalkers,
  getTalkerById,
  addNewTalker,
  editTalkerById,
  deleteTalkerById,
  searchTalkersByQuery,
} = require('../../src/utils/handleTalkers');

describe('testa as funções relacionadas a rota talker', function () {
  it('testa a função getTalker', async function () {
    const talkers = await getTalkers();
    expect(talkers).to.be.instanceOf(Array);
  })
})