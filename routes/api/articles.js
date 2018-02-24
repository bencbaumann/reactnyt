const router = require("express").Router();
const articlesController = require("../../controllers/articlesController");
const nytApiController = require("../../controllers/nytApiController");

// Matches with "/api/articles"
router.route("/")
  .get(articlesController.findAll)
  .post(articlesController.create);
  // .delete(booksController.create);

// Matches with "/api/articles/fetch"
router.route("/fetch")
  .post(nytApiController.fetch);

// Matches with "/api/:id"
router.route("/:id")
  .delete(articlesController.remove);

module.exports = router;
