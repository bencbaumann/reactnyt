const router = require('express').Router()
const articlesController = require('../../controllers/articlesController')
const nytApiController = require('../../controllers/nytApiController')

// Matches with "/api/articles"
router.route('/')
  .get(articlesController.findAll)
  .post(articlesController.create)

// Matches with "/api/articles/fetch"
router.route('/fetch')
  .post(nytApiController.fetch)

router.route('/:id')
  .get(articlesController.findById)
  .post(articlesController.addNoteToArticle)
  .delete(articlesController.delete)

router.route('/note/delete')
  .post(articlesController.deleteNote)

module.exports = router
