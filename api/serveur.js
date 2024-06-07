const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
require("dotenv").config();

const app = express();
app.use(cors());

// Connexion à la base de données
connectDB();

app.use(express.json());
app.use("/api/", require("./routes/bookRoutes"));
app.use("/api/", require("./routes/userRoutes"));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
