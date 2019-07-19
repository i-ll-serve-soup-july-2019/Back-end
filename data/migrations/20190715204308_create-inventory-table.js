exports.up = function(knex) {
  return knex.schema.createTable("inventory", tbl => {
    tbl.increments("id").primary();
    //foreign keys
    // tbl
    //   .integer("userId")
    //   .references("id")
    //   .inTable("users")
    //   .notNull()
    //   .onDelete("cascade");
    tbl
      .string("username")
      .references("username")
      .inTable("users")
      .notNull();
    //refer to user id and username from users table
    tbl.string("item", 32).notNullable();
    tbl.integer("quantity").defaultTo(0);
    tbl.string("units", 32).notNullable();
    tbl.integer("threshold").defaultTo(1);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("inventory");
};
