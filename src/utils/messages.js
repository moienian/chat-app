const generateMessage = (text) => {
  return {
    text,
    createdAt: new Date().toString(),
  };
};

module.exports = {
  generateMessage,
};
