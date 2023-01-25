const app = require('../app');

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();
const Author = require('../models/Author.model');
const Book = require('../models/Book.model');
// all your routes here

router.get('/', async (req, res, next) => {
  console.log('GETTING AUTHORS');
  try {
    authors = await Author.find().populate('books');
    res.render('authors/authors', { authors });
  } catch (err) {
    next(err);
  }
});

router.get('/create/:id?', async (req, res, next) => {
  console.log('Adding Author');
  try {
    const formData = {
      title: 'Add New Author',
      action: '/authors/create',
      btnSubmit: 'Add Author',
    };

    let author = {};
    let books = [];

    books = await Book.find();

    if (req.params.id) {
      author = await Author.findById(req.params.id);

      books.forEach((book) => {
        if (book._id.equals(author.books)) book.selected = true;
      });

      formData.title = 'Edit Author';
      formData.action = `/authors/update/${author._id}`;
      formData.btnSubmit = 'Save Changes';
    }

    res.render('authors/author-form', { author, books, formData });
  } catch (err) {
    console.log({ caquense: err });
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id).populate('books');
    res.render('authors/author-details', { author });
  } catch (err) {
    next(err);
  }
});

router.post('/update/:id', async (req, res, next) => {
  try {
    if (req.body.pictureUrl === '') delete req.body.pictureUrl;
    console.log({ body: req.body });
    const data = await Author.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/authors');
  } catch (err) {
    next(err);
  }
});

router.post('/create', async (req, res, next) => {
  console.log('Saving Author to Database');
  try {
    const data = await Author.create(req.body);
    if (data) res.redirect('/authors');
  } catch (err) {
    next(err);
  }
});

router.get('/delete/:id', async (req, res, next) => {
  try {
    const data = await Author.findByIdAndDelete(req.params.id);
    res.redirect('/authors');
  } catch (err) {
    next(err);
  }
});
module.exports = router;


