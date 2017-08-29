exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.string('email').unique().notNullable()
    table.dropUnique('username')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('email')
    table.unique('username')
  })
};
