const express = require('express');

const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.json(':)');
});

app.listen(PORT || 3000, () => {
  console.log(`app is running on ${PORT ? PORT : '3000'}`);
});
