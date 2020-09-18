const Mscamp = require("../models/Mscamp.js");
const ErrorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async.js");
/**
 * @desc    获取米修所有数据
 * @route   GET /api/v1/mscamps
 * @access  公开的
 */
exports.getMscamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @desc    创建米修数据
 * @route   POST /api/v1/mscamps
 * @access  公开的
 */
exports.createMscamp = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  // 如果用户角色是admin 那么可以创建多个机构信息 否则只能创建一个机构
  const publishedMscamp = await Mscamp.findOne({ user: req.user.id });

  if (publishedMscamp && req.user.role !== "admin") {
    return next(new ErrorResponse("该机构已存在,请不要重复创建", 400));
  }

  const mscamp = await Mscamp.create(req.body);
  res.status(200).json({ success: true, data: mscamp });
});

/**
 * @desc    根据ID获取米修某个数据
 * @route   GET /api/v1/mscamps/:id
 * @access  公开的
 */
exports.getMscamp = asyncHandler(async (req, res, next) => {
  const mscamp = await Mscamp.findById(req.params.id);

  if (!mscamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: mscamp });
});

/**
 * @desc    根据id更新米修数据
 * @route   PUT /api/v1/mscamps/:id
 * @access  公开的
 */
exports.updateMscamp = asyncHandler(async (req, res, next) => {
  let mscamp = await Mscamp.findById(req.params.id);

  // 没找到
  if (!mscamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  // 确定当前的id和登录的用户id是一致的
  if (mscamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`该用户${req.params.id}无权限更新此数据`, 401)
    );
  }

  mscamp = await Mscamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: mscamp });
});

/**
 * @desc    根据id删除米修数据
 * @route   DELETE /api/v1/mscamps/:id
 * @access  公开的
 */
exports.deleteMscamp = asyncHandler(async (req, res, next) => {
  const mscamp = await Mscamp.findById(req.params.id);

  if (!mscamp) {
    return next(
      new ErrorResponse(`Resource not found with id of ${req.params.id}`, 404)
    );
  }

  // 确定当前的id和登录的用户id是一致的
  if (mscamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(`该用户${req.params.id}无权限删除此数据`, 401)
    );
  }

  mscamp.remove();

  res.status(200).json({ success: true, data: {} });
});
