const { Op } = require("sequelize");
const auth = require("../auth/auth");
const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons-before-today", async (req, res) => {
    try {
      const pokemons = await Pokemon.findAll({
        where: {
          created: {
            [Op.gte]: new Date(),
          },
        },
      });
      const message = `La liste des pokémons a bien été récupérée.`;
      res.json({ message, data: pokemons });
    } catch (error) {
      const message = ``;
      res.status(500).json({ message, data: error });
    }
  });
};
