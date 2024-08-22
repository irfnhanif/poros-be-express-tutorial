import express from "express";
import "dotenv/config";
import postRouter from "./routes/posts.routes.js";
// import usersRouter from "./routes/users.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posts", postRouter);
// app.use("/users", usersRouter);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});

export default app;
