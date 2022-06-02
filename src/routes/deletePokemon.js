const auth = require("../auth/auth");
const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (!pokemon) {
          const message = `Le pokemon que vous avez demandé n'existe pas ! Veuillez rééssayer avec un autre identifiant`;
          return res.status(404).json({ message });
        }

        const pokemonDeleted = pokemon;

        return Pokemon.destroy({
          where: { id: pokemon.id },
        }).then((_) => {
          const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`;
          res.json({ message, data: pokemonDeleted });
        });
      })
      .catch((error) => {
        const message = `Le pokemon n'a pas pu être supprimé ! Veuillez rééssayer plus tard`;
        res.status(500).json({ message, data: error });
      });
  });
};
