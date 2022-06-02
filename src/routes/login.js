const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_key");

module.exports = (app) => {
  app.post("/api/login", async (req, res) => {
    try {
      const user = await User.findOne({
        where: { username: req.body.username },
      });

      if (!user) {
        const message = `L'identifiant demandé n'existe pas.`;
        res.status(404).json({ message });
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isPasswordValid) {
        const token = jwt.sign({ userId: user.id }, privateKey, {
          expiresIn: "24h",
        });

        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user, token });
      }

      const message = `Le mot de passe est incorrect`;
      res.status(401).json({ message });
    } catch (error) {
      const message = `Une erreur s'est produit pendant la connexion`;
      res.status(500).json({ message, data: error });
    }
  });
};
