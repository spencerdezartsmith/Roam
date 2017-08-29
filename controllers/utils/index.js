exports.handleError = (err, req, res, next) => {{
  return res.status(500).send({ error: 'Something went wrong', msg: err.message })
}}
