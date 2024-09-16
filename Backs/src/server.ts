import dotenv from "dotenv";
import connectKindEarthDB from "./db";
import app from "./app";

dotenv.config();
const port = process.env.PORT || 3000;

connectKindEarthDB();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});