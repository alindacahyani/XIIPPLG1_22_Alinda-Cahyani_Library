const booksModel = require('../models/booksModel'); // Mengimpor model 'booksModel' yang berisi query database

module.exports = {
  // 1. Menampilkan semua data buku
  getAllBooks: (req, res) => {
    booksModel
      .getAllBooks()
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },

  // 2. Menampilkan data buku berdasarkan ID
  getBookById: (req, res) => {
    const { id } = req.params;

    booksModel
      .getBookById(id)
      .then((results) => {
        if (results.length === 0) {
          return res.status(404).json({ message: 'Book not found' });
        }
        res.json(results[0]);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },

  // 3. Menambahkan data buku baru
  store: (req, res) => {
    const { title, writer, user_id, category_id, publisher, year } = req.body;

    if (!title || !writer || !user_id || !category_id || !publisher || !year) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    booksModel
      .addBook(title, writer, user_id, category_id, publisher, year)
      .then((insertId) => {
        res.json({ id: insertId, title, writer, user_id, category_id, publisher, year });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },

  // 4. Mengupdate data buku berdasarkan ID
  update: (req, res) => {
    const { id } = req.params;
    const { title, writer, user_id, category_id, publisher, year } = req.body;

    booksModel
      .updateBook(id, title, writer, user_id, category_id, publisher, year)
      .then((result) => {
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book updated successfully' });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },

  // 5. Menghapus buku berdasarkan ID
  delete: (req, res) => {
    const { id } = req.params;

    booksModel
      .deleteBook(id)
      .then((result) => {
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  },
};