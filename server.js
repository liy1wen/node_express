const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middleware/error.js");
const cookieParser = require("cookie-parser");

// 引入路由文件
const mscamps = require("./routes/mscamps.js");
const courses = require("./routes/courses.js");
const auth = require("./routes/auth.js");
const users = require("./routes/users.js");
const reviews = require("./routes/reviews.js");

dotenv.config({
  path: "./config/config.env",
});

// ./docgen build -i 米修在线api.postman_collection.json -o index.html

// 链接数据库
connectDB();

const app = express();

// 配置Body解析
app.use(express.json());

// 使用morgan中间件
app.use(morgan("dev"));

// app.use(logger);

// 使用cookie中间件
app.use(cookieParser());

// 挂载路由节点 http://localhost:5000/api/v1/mscamps
app.use("/api/v1/mscamps", mscamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

// 一定要写在路由挂载之前
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.magenta
      .bold
  )
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  // 关闭服务器 & 退出进程
  server.close(() => {
    process.exit(1);
  });
});
