const { Op } = require("sequelize");
const auth = require("../auth/auth");
const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/api/pokemons", auth, async (req, res) => {
    try {
      const name = req.query.name;

      if (name && name.length < 2) {
        const message = `Le terme de recherche de l'utilisateur doit contenir au moins deux caractères`;
        return res.status(400).json({ message });
      }

      if (name) {
        const queryParams = {
          where: { name: { [Op.substring]: name } },
          limit: 5,
          order: ["name"],
        };

        if (req.query.limit) {
          queryParams["limit"] = parseInt(req.query.limit);
        }

        const { count, rows } = await Pokemon.findAndCountAll(queryParams);
        const message = `Il y a ${count} pokemons qui correspondent à la recherche : ${name}`;
        return res.json({ message, data: { count, rows } });
      }

      const pokemons = await Pokemon.findAll({ order: ["name"] });
      const message = `La liste des pokémons a bien été récupérée.`;
      res.json({ message, data: pokemons });
    } catch (error) {
      const message = ``;
      res.status(500).json({ message, data: error });
    }
  });
};
