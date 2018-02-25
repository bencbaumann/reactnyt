const db = require('../models')

module.exports = {
  findAll: function (req, res) {
    db.Article
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  findById: function (req, res) {
    db.Book
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  create: function (req, res) {
    console.log(req.body)
    const data = {}
    data.title = req.body.headline.main
    data.url = req.body.web_url
    data.date = req.body.pub_date
    db.Article
      .create(data)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  remove: function (req, res) {
    console.log('deleting on the server')
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  update: function (req, res) {
    db.Book
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}
