exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary()
    table.string('username').notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.string('current_city').notNullable()
    table.string('join_date').defaultTo(knex.fn.now())
    table.string('profile_photo').defaultTo('http://s-ak.buzzfed.com/static/enhanced/web03/2010/4/6/16/enhanced-buzz-11539-1270587474-31.jpg')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  }).createTable('cities', function(table) {
    table.increments('id').primary()
    table.string('city_image').notNullable()
    table.string('city_name').notNullable()
  }).createTable('posts', function(table) {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.text('content').notNullable()
    table.integer('user_id').references('users.id')
    table.integer('city_id').references('cities.id')
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cities')
    .dropTable('posts')
    .dropTable('users')
};
