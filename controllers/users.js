const router = require('express').Router()
const User = require('../models/user')

exports.getOneUser = (req, res, next) => {
  console.log(req.params)
}
