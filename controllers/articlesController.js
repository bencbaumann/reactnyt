const db = require('../models')

module.exports = {
  findAll: function (req, res) {
    db.Article
      .find(req.query)
      .populate('notes')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findById: function (req, res) {
    db.Article
      .findById(req.params.id)
      .populate('notes')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  create: function (req, res) {
    const io = req.app.get('socketio')
    console.log(req.body)
    const data = {}
    data.title = req.body.headline.main
    data.url = req.body.web_url
    data.date = req.body.pub_date
    db.Article
      .create(data)
      .then(dbModel => {
        io.emit('articleSaved', {
          msg: 'Someone Saved an Article'
        })
        return dbModel
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  delete: (req, res) => {
    console.log('deleting on the server')
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  deleteNote: (req, res) => {
    console.log('deleting a note on the server')
    db.Note
      .findById({ _id: req.body.noteId })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  addNoteToArticle: (req, res) => {
    db.Note.create({body: req.body.note})
      .then(dbNote => {
        return db.Article
          .findOneAndUpdate({ _id: req.params.id }, {$push: {notes: dbNote._id}}, {new: true})
          .populate('notes')
      })
      .then(dbArticle => res.json(dbArticle))
      .catch(err => res.json(err))
  },
  update: function (req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}
