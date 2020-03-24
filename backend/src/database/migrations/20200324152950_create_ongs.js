exports.up = function (knex) {
    return knex.schema.createTable("ongs", function (table) {
        table.string("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("whatsapp").notNullable();
        table.string("city").notNullable();
        table.string("uf", 2).notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("ongs");
};


// The "2" parameter after "uf" says that the data related to UF should only have 2 characters.   

// The "up" method is responsible for creating the table. It says whats happens whenever the migration is
// executed.

// The "down" method is responsible for undoing what the "up" method created.