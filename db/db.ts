import mongoose from "mongoose";

const url = process.env.ATLAS_URI as string;

export default function connect() {
  mongoose
    .connect(url, { keepAlive: true, keepAliveInitialDelay: 300000 })
    .catch((err) => console.error(err));

  mongoose.connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
  });
}
