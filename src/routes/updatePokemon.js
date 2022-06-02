const auth = require("../auth/auth");
const { Pokemon } = require("../db/sequelize");
const { getValidationErrors } = require("../helpers/validation");

module.exports = (app) => {
  app.put("/api/pokemons/:id", auth, (req, res) => {
    const id = req.params.id;
    Pokemon.findByPk(id)
      .then((pokemon) => {
        if (!pokemon) {
          const message = `Le pokémon que vous avez demandé n'existe pas. Veullez rééssayer avec un autre identifiant`;
          return res.status(404).json({ message });
        }

        return Pokemon.update(req.body, {
          where: { id: id },
        }).then(() => {
          const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((error) => {
        if (error instanceof UniqueConstraintError) {
          return res.status(422).json({ message: error.message, data: error });
        }

        if (error instanceof ValidationError) {
          return res
            .status(422)
            .json({ message: error.message, data: getValidationErrors(error) });
        }

        const message = `Le pokémon n'a pas pu être modifié ! Veuillez rééssayer dans quelques instants`;
        res.status(500).json({ message, data: error });
      });
  });
};
