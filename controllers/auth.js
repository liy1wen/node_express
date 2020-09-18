const crypto = require("crypto");
const User = require("../models/User.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async.js");
const sendEmail = require("../utils/sendEmail.js");

/**
 * @desc    注册
 * @route   POST /api/v1/auth/register
 * @access  公开的
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, role, password } = req.body;
  // 注册用户
  const user = await User.create({ name, email, password, role });

  // 生成token
  sendTokenResponse(user, 200, res);
});

/**
 * @desc    登录
 * @route   POST /api/v1/auth/login
 * @access  公开的
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // 验证邮箱和密码是否为空
  if (!email || !password) {
    return next(new ErrorResponse("请填写邮箱和密码", 400));
  }

  // 获取用户信息
  const user = await User.findOne({ email }).select("+password");

  // 校验用户信息是否存在
  if (!user) {
    return next(new ErrorResponse("参数有误", 401));
  }

  //  密码匹配
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("密码错误", 401));
  }

  // 生成token;
  sendTokenResponse(user, 200, res);
});

/**
 * @desc    获取当前登录用户信息
 * @route   GET /api/v1/auth/me
 * @access  公开的
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  //   console.log(req.user);
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

/**
 * @desc    更新个人信息
 * @route   PUT /api/v1/auth/updatedetails
 * @access  Private
 */
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
  };
  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, data: user });
});

/**
 * @desc    更新密码
 * @route   PUT /api/v1/auth/updatepassword
 * @access  Private
 */
exports.updatePassword = asyncHandler(async (req, res, next) => {
  // 旧密码 新密码
  const user = await User.findById(req.user.id).select("+password");

  // 判断旧密码和数据库密码是否一致
  if (!(await user.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse("密码错误", 401));
  }

  // 更新密码
  user.password = req.body.newPassword;

  // 存储
  await user.save();

  sendTokenResponse(user, 200, res);
});

/**
 * @desc    忘记密码
 * @route   POST /api/v1/auth/forgotpassword
 * @access  公开的
 */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  // 校验用户
  if (!user) {
    return next(new ErrorResponse("未找到该用户", 404));
  }

  const resetToken = user.getResetPasswordToken();
  // console.log(resetToken);

  await user.save({ validateBeforeSave: false });

  // 发送邮件 包含重置密码的网址
  // {{URL}}/api/v1/auth/resetpassword/imissu1217
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `收到该邮件的原因是你需要重置密码, 请点击链接${
    req.protocol
  }://${req.get("host")}/api/v1/auth/resetpassword/${resetToken}`;

  // 发送邮件
  try {
    await sendEmail({
      email: user.email,
      subject: "重置密码",
      message,
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("邮件发送失败", 500));
  }

  res.status(200).json({ success: true, data: user });
});

/**
 * @desc    重置密码
 * @route   POST /api/v1/auth/resetpassword/:resettoken
 * @access  公开的
 */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 获取resetPasswordToken
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorResponse("token不合法", 400));
  }

  // 重置密码
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  // 存储
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res);
});

// 生成token并存储到cookie的方法
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV == "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
