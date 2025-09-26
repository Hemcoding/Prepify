import connectDB from "./db/index.js";
import { app } from "./app.js";
import 'dotenv/config'

// dotenv.config({
//     path: "./env",
// });

const port = process.env.PORT || 8000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });

    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
  })
  .catch((e) => {
    console.log("Mongo connection failed !! ", e);
  });
