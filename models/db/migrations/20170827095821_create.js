exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary()
    table.string('username').unique().notNullable()
    table.string('password').notNullable()
    table.string('currentCity').notNullable()
    table.string('profilePhoto').defaultTo('http://s-ak.buzzfed.com/static/enhanced/web03/2010/4/6/16/enhanced-buzz-11539-1270587474-31.jpg')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  }).createTable('cities', function(table) {
    table.increments('id').primary()
    table.string('city_image').notNullable()
    table.string('city_name').notNullable()
  }).createTable('posts', function(table) {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.text('content').notNullable()
    table.integer('author_id').references('users.id')
    table.integer('city_id').references('cities.id')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
    .dropTable('posts')
    .dropTable('cities')
};
