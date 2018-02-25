require('dotenv').config()
const axios = require('axios')
const {stringify} = require('querystring')

// Defining methods for the booksController
module.exports = {
  fetch: function (req, res) {
    console.log(req.body)
    const qs = stringify({
      'api-key': process.env.APIKEY,
      'q': req.body.searchTerm,
      'begin_date': `${req.body.startYear}0101` || '19000101',
      'end_date': `${req.body.endYear}0101` || '20180101'
    })
    console.log(qs)
    axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?${qs}`)
      .then(response => {
        res.json(response.data.response.docs)
      })
      .catch(err => {
        res.status(422).json(err)
      })
  }
}
