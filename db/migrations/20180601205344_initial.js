exports.up = (knex, Promise) =>
  Promise.all([
    knex.schema.createTable('project', (table) => {
      table.increments('id').primary();
      table.string('name', 128);
      table.text('description');
      table.boolean('is_complete').defaultTo(false);
    }),

    knex.schema.createTable('action', (table) => {
      table.increments('id').primary();
      table.integer('project_id').unsigned();
      table.foreign('project_id').references('project.id');
      table.text('description');
      table.text('notes');
      table.boolean('is_complete').defaultTo(false);
    }),

    knex.schema.createTable('context', (table) => {
      table.increments('id').primary();
      table.string('context');
    }),

    knex.schema.createTable('action_context', (table) => {
      table.increments('id').primary();
      table.integer('context_id').unsigned();
      table.foreign('context_id').references('context.id');
      table.integer('action_id').unsigned();
      table.foreign('action_id').references('action.id');
    }),

    knex.schema.createTable('project_context', (table) => {
      table.increments('id').primary();
      table.integer('context_id').unsigned();
      table.foreign('context_id').references('context.id');
      table.integer('project_id').unsigned();
      table.foreign('project_id').references('project.id');
    }),
  ]);

exports.down = (knex, Promise) =>
  Promise.all([
    knex.schema.dropTable('action_context'),
    knex.schema.dropTable('project_context'),
    knex.schema.dropTable('action'),
    knex.schema.dropTable('context'),
    knex.schema.dropTable('project'),
  ]);
