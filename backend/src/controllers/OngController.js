const connection = require("../database/connection");
const generateUniqueId = require("../utils/generateUniqueId");

module.exports = {
    async index(req, res) {
        const ongs = await connection("ongs").select("*");
        return res.json(ongs);
    },

    async create(req, res) {
        console.log(req.body);
        const {
            name,
            email,
            whatsapp,
            city,
            country
        } = req.body;

        const id = generateUniqueId();

        await connection("ongs").insert({
            id,
            name,
            email,
            whatsapp,
            city,
            country
        });

        return res.json({
            id
        });
    }
};