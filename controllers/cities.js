const City = require('../models/city')

exports.getAllCities = (req, res, next) => {
  City.fetchAll()
    .then(cities => res.send({ cities: cities }))
    .catch(err => res.status(500).send({ error: 'Something went wrong', msg: err.message }))
}
