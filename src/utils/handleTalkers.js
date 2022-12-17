const fs = require('fs').promises;
const path = require('path');

const getTalkers = async () => {
  const response = await fs.readFile(
    path.resolve(__dirname, '../talker.json'), { encoding: 'utf8' },
  );
  const talkers = JSON.parse(response);
  return talkers;
};

const getTalkerById = async (id) => {
  const talkers = await getTalkers();
  const talker = talkers.find((el) => el.id === Number(id));
  return talker;
};

const addNewTalker = async (data) => {
  const talkers = await getTalkers();
  const ids = talkers.map((el) => el.id);
  ids.sort((a, b) => a - b);
  const newId = ids[ids.length - 1] + 1;
  const newTalkers = [...talkers, { ...data, id: newId }];
  await fs.writeFile(
    path.resolve(__dirname, '../talker.json'), JSON.stringify(newTalkers, null, 2),
  );
  return { ...data, id: newId };
};

const editTalkerById = async (id, data) => {
  const talkers = await getTalkers();
  const indexOfOldTalkerId = talkers.findIndex((el) => el.id === Number(id));
  talkers[indexOfOldTalkerId] = { id, ...data };
  await fs.writeFile(
    path.resolve(__dirname, '../talker.json'), JSON.stringify(talkers, null, 2),
  );
  return talkers[indexOfOldTalkerId];
};

const deleteTalkerById = async (id) => {
  const talkers = await getTalkers();
  const newTalkers = talkers.filter((el) => el.id !== Number(id));
  await fs.writeFile(
    path.resolve(__dirname, '../talker.json'), JSON.stringify(newTalkers, null, 2),
  );
};

const searchTalkersByQuery = async (query) => {
  const talkers = await getTalkers();
  const searchedTalkers = talkers
    .filter((el) => el.name.toLowerCase().includes(query.toLowerCase()));
  if (!query || query.length === 0) {
    return talkers;
  }
  if (searchedTalkers.length === 0) {
    return [];
  }
  return searchedTalkers; 
};

module.exports = {
  getTalkers,
  getTalkerById,
  addNewTalker,
  editTalkerById,
  deleteTalkerById,
  searchTalkersByQuery,
};
