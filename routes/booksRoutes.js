const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController'); // Import controller books

// Route untuk mendapatkan semua buku
router.get('/', booksController.getAllBooks);

// Route untuk mendapatkan buku berdasarkan ID
router.get('/:id', booksController.getBookById);

// Route untuk menambahkan buku baru
router.post('/', booksController.store);

// Route untuk memperbarui buku berdasarkan ID
router.put('/:id', booksController.update);

// Route untuk menghapus buku berdasarkan ID
router.delete('/:id', booksController.delete);

module.exports = router; // Mengekspor router agar bisa digunakan di file lain