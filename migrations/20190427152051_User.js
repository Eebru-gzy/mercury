
exports.up = function(knex) {
  return knex.schema
    .createTableIfNotExists('users', function(table) {
        table.increments('id').primary();
        table.string('first_name').nullable();
        table.string('last_name').nullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('city').nullable();
        table.string('state').nullable();
        table.string('middle_name').nullable();
        table.string('phone_number').nullable();
        table.date('dob').nullable().comment('The date of birth');
        table.string('country').nullable();
        table.string('sex').nullable();
        table.string('age').nullable();
        table.timestamps();
    })
    .createTableIfNotExists('images', function(table) {
      table.increments('id').primary();
      table.string('public_id').notNullable();
      table.string('tag').notNullable();
      table.string('format').notNullable();
      table.string('image_url').notNullable();
      table.string('original_filename').notNullable();
      table.integer('uploaded_by').unsigned().notNullable().references('id').inTable('users');
      table.timestamps();
    })
    .createTableIfNotExists('posts', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      table.string('image_url').notNullable();
      table.string('public_id').notNullable();
      table.string('title').notNullable();
      table.text('content').notNullable();
      table.timestamps();
    })
    .createTableIfNotExists('user_wallet', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      table.integer('balance').unsigned().notNullable().defaultTo(0)
      table.integer('account_number').unsigned().notNullable().defaultTo(0)
      table.integer('bank_name').unsigned().notNullable().defaultTo(0)
      table.integer('account_name').unsigned().notNullable().defaultTo(0)
      table.timestamps();
    })
    .createTableIfNotExists('wallet_logs', (table) => {
      table.increments('id').primary();
      table.integer('wallet_id').unsigned().notNullable().references('id').inTable('user_wallet');
      table.integer('previous_balance').unsigned().notNullable().defaultTo(0)
      table.integer('current_balance').unsigned().notNullable().defaultTo(0)
      table.timestamps();
    })
    .createTableIfNotExists('book_scope', function(table) {
      table.increments('id').primary();
      table.string('value').notNullable();
    })
    .createTableIfNotExists('charge', function(table) {
      table.increments('id').primary();
      table.string('value').notNullable();
    })
    .createTableIfNotExists('books', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
      table.string('title').notNullable();
      table.string('author').notNullable();
      table.text('description').notNullable();
      table.string('public_id').notNullable(); 
      table.string('book_url').notNullable();
      table.integer('scope_id').unsigned().notNullable().references('id').inTable('book_scope')
      table.integer('charge_id').unsigned().notNullable().references('id').inTable('charge')
      table.integer('amount').unsigned().notNullable().defaultTo(0)
      table.timestamps();
    })
    .createTableIfNotExists('status', function(table) {
      table.increments('id').primary();
      table.string('value').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('images')
    .dropTableIfExists('posts')
    .dropTableIfExists('books')
    .dropTableIfExists('book_scope')
    .dropTableIfExists('charge')
    .dropTableIfExists('status')
    .dropTableIfExists('user_wallet')
    .dropTableIfExists('wallet_logs')
  };
