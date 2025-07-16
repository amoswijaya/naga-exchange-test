import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";
import transactionRoute from "./routes/transactionRoute";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (_, res) => res.json({ message: "Welcome to API" }));
app.use("/api/auth", authRoute);
app.use("/api/transaction", transactionRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
