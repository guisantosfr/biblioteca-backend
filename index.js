const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(express.json());

const books = [];

app.post('/obras', (req, res) => {
  const { title, publisher, image, authors } = req.body;

  books.push({
    id: uuidv4(),
    title,
    publisher,
    image,
    authors
  });

  return res.status(201).send();
});

app.get('/obras', (req, res) => {
  return res.json(books);
});

app.put('/obras/:id', (req, res) => {
  const { id } = req.params;
  const { title, publisher, image, authors } = req.body;

  let bookFound = books.find(book => book.id === id);

  if (!bookFound) {
    return res.status(404).json({ error: "Book not found" });
  }

  bookFound.title = title;
  bookFound.publisher = publisher;
  bookFound.image = image;
  bookFound.authors = authors;

  return res.status(200).send();
});

app.delete('/obras/:id', (req, res) => {
  const { id } = req.params;

  const index = books.findIndex(book => book.id === id);

  books.splice(index, 1);

  return res.status(200).send();
});

app.listen(3000);