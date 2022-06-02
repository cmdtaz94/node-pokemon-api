const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const PokemonModel = require("../models/pokemon");
const UserModel = require("../models/user");
const pokemons = require("./mock-pokemon");

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
  dialectOptions: {
    timezone: "+01:00",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then(async () => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    try {

      const hash = await bcrypt.hash("pikachu", 10);

      const userPikachu = await User.create({
        username: "pikachu",
        password: hash,
      });

      console.log(userPikachu.toJSON());
    } catch (error) {
      console.log("Impossible de créer l'utilisateur pikachu");
    }

    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
