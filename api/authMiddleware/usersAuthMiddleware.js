const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization
        ? req.headers.authorization.split(" ")[1]
        : null;

    if (!token) {
        return res.status(401).json({ message: "Token manquant" });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        console.log(`Token décodé dans le middleware : ${decodedToken}`); // Log du token décodé dans le middleware
        next();
    } catch (error) {
        console.error("Erreur de validation du token:", error); // Log de l'erreur de validation du token
        return res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = authMiddleware;
