import axios from 'axios'

export default {
  // Gets all books
  fetch: function (data) {
    console.log(data)
    return axios.post('/api/articles/fetch', data)
  },
  saveArticle: function (data) {
    console.log(data)
    return axios.post('/api/articles', data)
  },
  getSavedArticles: function () {
    console.log('getting articles')
    return axios.get('/api/articles')
  },
  getSavedArticle: article => {
    return axios.get(`/api/articles/${article._id}`)
  },
  // Deletes the book with the given id
  deleteArticle: function (data) {
    console.log('deleting articles')
    console.log(data._id)
    return axios.delete('/api/articles/' + data._id)
  },
  saveNote: function (data) {
    console.log('saving note')
    console.log(data)
    return axios.post('/api/articles/' + data.articleId, {note: data.note})
  },
  deleteNote: function (noteId) {
    console.log('deleting note')
    return axios.post('/api/articles/note/delete', {noteId: noteId})
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get('/api/books/' + id)
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete('/api/books/' + id)
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post('/api/books', bookData)
  }
}
