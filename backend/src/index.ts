import express from "express";
import cors from "cors";
import routes from "./routes/routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Permite requisições do frontend
app.use(express.json()); // Habilita JSON no corpo das requisições

// Rotas da API
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
