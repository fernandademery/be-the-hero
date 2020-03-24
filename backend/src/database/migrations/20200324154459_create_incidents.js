exports.up = function (knex) {
    return knex.schema.createTable("incidents", function (table) {
        table.increments();
        table.string("title").notNullable();
        table.string("description").notNullable();
        table.decimal("value").notNullable();

        table.string("ong_id").notNullable(); // this brings the relation between the "ongs" database and the
        // "incidents" database. This way I can create the incdents 
        // related to each ONG listed in my app.
        table.foreign("ong_id").references("id").inTable("ongs");
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("incidents");
};