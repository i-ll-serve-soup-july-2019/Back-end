exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl.string("name", 255).notNullable();
    tbl
      .string("email", 32)
      .notNullable()
      .unique();
    tbl
      .string("username", 32)
      .notNullable()
      .unique();
    tbl.string("password", 32).notNullable();
    tbl.string("role", 32);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
