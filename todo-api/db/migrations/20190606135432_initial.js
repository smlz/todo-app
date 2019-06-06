
exports.up = async function(knex) {
  await knex.schema.createTable('todo', (table) => {
    table.increments('id')
    table.text('text').notNullable()
    table.boolean('done').defaultTo(false).notNullable()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTable('todo')
};
