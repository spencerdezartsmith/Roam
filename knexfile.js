module.exports = {
  client: 'pg',
  connection: 'postgres://localhost:5432/roam',
  migrations: {
    directory: __dirname + '/models/db/migrations'
  }
}
