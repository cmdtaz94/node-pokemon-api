const validTypes = [
  "Insecte",
  "Poison",
  "Plante",
  "Feu",
  "Eau",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "Utilisez uniquement des chaînes de caractères non vides.",
          },
          notNull: { msg: "Le nom est une propriété requise." },
          len: {
            args: [1, 25],
            msg: "Utilisez uniquement des chaînes de caractères de 1 à 25 lettres",
          },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement les nombres entier pour les points de vie.",
          },
          notNull: { msg: "Les points de vie sont une propriété requise." },
          max: {
            args: [999],
            msg: "Utilisez uniquement les nombres entier inférieur ou égale à 999",
          },
          min: {
            args: [0],
            msg: "Utilisez uniquement les nombres entier supérieur ou égale à O",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement les nombres entier pour les dégats.",
          },
          notNull: { msg: "Les dégats sont une propriété requise." },
          max: {
            args: [99],
            msg: "Utilisez uniquement les nombres entier inférieur ou égale à 99",
          },
          min: {
            args: [0],
            msg: "Utilisez uniquement les nombres entier supérieur ou égale à O",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Utilisez uniquement des URLs valides pour les photos.",
          },
          notNull: { msg: "La photos est une propriété requise." },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (value.split(",").length > 3 || value.split(",").length < 1) {
              throw new Error(
                "Le nombre de types doit être compris entre 1 et 3."
              );
            }
            const typesChecked = [];

            value.split(",").forEach((element) => {
              if (!validTypes.includes(element)) {
                throw new Error(
                  `Les types d'un pokemon doivent appartenir à la liste suivante : ${validTypes}`
                );
              }

              if (typesChecked.includes(element)) {
                throw new Error(
                  `Les types d'un pokemon doivent être distincts`
                );
              }

              typesChecked.push(element);
            });
          },
          notNull: { msg: "Les types sont une propriété requise." },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
