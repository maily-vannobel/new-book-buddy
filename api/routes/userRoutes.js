const express = require("express");
const bodyParser = require("body-parser");
const controllerUser = require("../controllers/userController");
const authMiddleware = require("../authMiddleware/usersAuthMiddleware");
const app = express.Router();

app.use(bodyParser.json());

app.post("/register", controllerUser.register); //POST; route pour INSCRIPTION
app.post("/login", controllerUser.login); // connexion utilisateurs
app.get("/users", controllerUser.getAllUsers); // Récupère les infos de tout les utilisateurs
app.get("/userInfo", authMiddleware, controllerUser.getUserInfo); // Récupère les infos de l'utilisateur connecté
app.put("/updatePassword", authMiddleware, controllerUser.updatePassword); // Met a jour le mot de passe

module.exports = app;
