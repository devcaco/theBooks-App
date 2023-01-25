const app = require('../app');

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();
const Book = require('../models/Book.model');
const Author = require('../models/Author.model');
// all your routes here

router.get('/', async (req, res, next) => {
  try {
    books = await Book.find().populate('authors');
    res.render('books/books', { books });
  } catch (err) {
    next(err);
  }
});

router.get('/create/:id?', async (req, res, next) => {
  console.log('Creating Book');
  try {
    const formData = {
      title: 'Add New Book',
      action: '/books/create',
      btnSubmit: 'Add Book',
    };
    let authors = [];
    let book = {};

    authors = await Author.find();

    if (req.params.id) {
      book = await Book.findById(req.params.id).populate('authors');
      book.authorsIds = [];

      book.authors.forEach((author) => {
        book.authorsIds.push(author._id);
        author.index = authors.findIndex((e) => e._id.equals(author._id)) + 2;
      });

      book.authorsIds = book.authorsIds.toString();

      authors = authors.filter((author) =>
        book.authors.findIndex((e) => e._id.equals(author._id) > -1) 
      );

      formData.title = 'Edit Book';
      formData.action = `/books/update/${book._id}`;
      formData.btnSubmit = 'Save Changes';
    }

    res.render('books/book-form', { book, authors, formData });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate('authors');
    res.render('books/book-details', { book });
  } catch (err) {
    next(err);
  }
});

router.post('/update/:id', async (req, res, next) => {
  try {
    req.body.authors = req.body.authors.split(',');
    const data = await Book.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/books');
  } catch (err) {
    next(err);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    req.body.authors = req.body.authors.split(',');
    const data = await Book.create(req.body);
    if (data) res.redirect('/books');
  } catch (err) {
    next(err);
  }
});

router.get('/delete/:id', async (req, res, next) => {
  try {
    const data = await Book.findByIdAndDelete(req.params.id);
    res.redirect('/books');
  } catch (err) {
    next(err);
  }
});
module.exports = router;
