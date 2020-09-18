// 创建中间件
const logger = (req, res, next) => {
  // req.data = { msg: "大家好,欢迎来到米修在线" };
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

module.exports = logger;
