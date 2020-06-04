import Knex from 'knex';

export async function up(knex: Knex) {
  // Create table
  return knex.schema.createTable('points_items', table => {
    table.increments('id').primary();
    table.string('point_id').notNullable().references('id').inTable('points');
    table.string('item_id').notNullable().references('id').inTable('items');
  });
}

export async function down(knex: Knex) {
  // Drop table
  return knex.schema.dropTable('points_items');
}