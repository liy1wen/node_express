const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async.js");
exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  // 判断该请求是否拥有token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  //   else if (req.cookie.token) {
  //     token = req.cookie.token;
  //   }

  // 校验token是否存在
  if (!token) {
    return next(new ErrorResponse("无权限访问该路由", 401));
  }

  try {
    //   验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorResponse("无权限访问该路由", 401));
  }
});

// 通过用户角色 控制访问的路由权限
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorResponse(`该用户无权限访问此路由`, 403));
    }
    next();
  };
};
