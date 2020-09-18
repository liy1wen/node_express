// 文件系统对象
const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config/config.env",
});

const Mscamp = require("./models/Mscamp.js");
const Course = require("./models/Course.js");
const User = require("./models/User.js");
const Review = require("./models/Review.js");

// 链接数据库
mongoose.connect(process.env.NET_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// 读取本地json数据
const mscamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/mscamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/courses.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/reviews.json`, "utf-8")
);

// 导入数据到mongodb数据库
const importData = async () => {
  try {
    await Mscamp.create(mscamps);
    await Course.create(courses);
    await User.create(users);
    await Review.create(reviews);
    console.log("数据存储成功".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// 删除数据库中的数据
const deleteData = async () => {
  try {
    await Mscamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("数据删除成功".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// console.log(process.argv);
if (process.argv[2] == "-i") {
  importData();
} else if (process.argv[2] == "-d") {
  deleteData();
}
