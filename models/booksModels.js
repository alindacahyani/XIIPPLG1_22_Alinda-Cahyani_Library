const db = require('../config/db'); // Mengimpor koneksi database dari file konfigurasi db

module.exports = {
  // 1. Menampilkan semua data books
  getAllBooks: () => {
    return new Promise((resolve, reject) => {
      // Menjalankan query untuk mendapatkan semua data dari tabel 'books'
      db.query('SELECT * FROM books', [], (err, results) => {
        if (err) return reject(err); // Jika terjadi error, reject promise dengan error
        resolve(results); // Jika berhasil, resolve promise dengan hasil query (array books)
      });
    });
  },

  // 2. Menampilkan data book berdasarkan ID
  getBookById: (id) => {
    return new Promise((resolve, reject) => {
      // Menjalankan query untuk mendapatkan satu book berdasarkan ID
      db.query('SELECT * FROM books WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err); // Jika terjadi error, reject promise dengan error
        resolve(results); // Jika berhasil, resolve promise dengan hasil query (book tertentu)
      });
    });
  },

  // 3. Menambahkan data book baru
  addBook: (title, writer, user_id, category_id, publisher, year) => {
    return new Promise((resolve, reject) => {
      // Menjalankan query untuk memasukkan data baru ke dalam tabel 'books'
      db.query(
        'INSERT INTO books (title, writer, user_id, category_id, publisher, year) VALUES (?, ?, ?, ?, ?, ?)',
        [title, writer, user_id, category_id, publisher, year],
        (err, result) => {
          if (err) return reject(err); // Jika terjadi error, reject promise dengan error
          resolve(result.insertId); // Jika berhasil, resolve promise dengan ID dari data yang baru ditambahkan
        }
      );
    });
  },

  // 4. Mengupdate data book berdasarkan ID
  updateBook: (id, title, writer, user_id, category_id, publisher, year) => {
    return new Promise((resolve, reject) => {
      // Menjalankan query untuk memperbarui data book berdasarkan ID
      db.query(
        'UPDATE books SET title = ?, writer = ?, user_id = ?, category_id = ?, publisher = ?, year = ? WHERE id = ?',
        [title, writer, user_id, category_id, publisher, year, id],
        (err, result) => {
          if (err) return reject(err); // Jika terjadi error, reject promise dengan error
          resolve(result); // Jika berhasil, resolve promise dengan hasil query (jumlah baris yang terpengaruh)
        }
      );
    });
  },

  // 5. Menghapus book berdasarkan ID
  deleteBook: (id) => {
    return new Promise((resolve, reject) => {
      // Menjalankan query untuk menghapus book berdasarkan ID
      db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
        if (err) return reject(err); // Jika terjadi error, reject promise dengan error
        resolve(result); // Jika berhasil, resolve promise dengan hasil query (jumlah baris yang terhapus)
      });
    });
  },
};