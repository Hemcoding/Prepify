import { User } from "../models/User.model.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { CreateApiError } from "../utils/CreateApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import bcrypt from "bcrypt";
import SendMail from "../utils/SendMail.js";
import crypto from "crypto";
import { mailGenerator } from "../utils/SendMail.js";

const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw CreateApiError(
      500,
      `something went wrong while generating access and refresh token ${error}`
    );
  }
};

const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw CreateApiError(400, "All field are required");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return res.status(409).json({
      success: false,
      statuscode: 409,
      message: "User with email already exist",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  console.log("user", user);

  const createdUser = await User.findById(user._id).select(" -refreshToken");

  console.log("createduser", createdUser);

  if (!createdUser) {
    throw CreateApiError(500, "Something went wrong while creating User");
  }

  return res
    .status(200)
    .json(ApiResponse(200, createdUser, "User create successfully"));
});

const loginUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw CreateApiError(400, "Email and Password are required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw CreateApiError(400, "Invalid email or password");
  }

  const isPaawordValid = await bcrypt.compare(password, user.password);

  if (!isPaawordValid) {
    throw CreateApiError(400, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id
  );

  const userResponse = user.toObject();
  delete userResponse.password;
  delete userResponse.refreshToken;

  return (
    res
      // .cookie("accessToken", accessToken, options)
      // .cookie("refreshToken", refreshToken, options)
      .json(
        ApiResponse(
          200,
          {
            user: userResponse,
            accessToken,
            refreshToken,
          },
          "User logged In Successfully"
        )
      )
  );
});

const logoutUser = AsyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        accessToken: null,
      },
    },
    {
      new: true,
    }
  );
  return res.json(ApiResponse(200, {}, "User logged out Successfully"));
});

const forgotPassword = AsyncHandler(async (req, res) => {
  const { email } = req.body;

  console.log(email);
  if (!email) {
    throw CreateApiError(400, "Email is required");
  }

  const user = await User.findOne({ email });

  console.log(user);

  if (!user) {
    throw CreateApiError(400, "User not Found");
  }

  const raw = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(raw).digest("hex");

  console.log(raw, hashedToken);

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

  const link = `${process.env.FRONT_APP_URL}/reset-password/${raw}`;

  const mail = {
    body: {
      name: user.name || "User",
      intro:
        "You have received this email because a password reset request for your account was received.",
      action: {
        instructions: "Click the button below to reset your password:",
        button: {
          color: "#22BC66",
          text: "Reset your password",
          link,
        },
      },
      outro:
        "If you did not request a password reset, no further action is required.",
    },
  };

  const emailBody = mailGenerator.generate(mail);

  await SendMail({
    to: user.email,
    subject: "Reset your password",
    html: emailBody,
  });

  return res.json(
    ApiResponse(200, {}, "Email was sent on your registered email id")
  );
});

const resetPassword = AsyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  console.log(token, password);

  if (!token || !password) throw CreateApiError(400, "Invalid request");

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw CreateApiError(400, "Invalid or expired token");
  }

  user.password = password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res.json(ApiResponse(200, "Password reset successfully"));
});

const getUser = AsyncHandler(async (req, res) => {
  console.log(req.user)
  const user = await User.findById(req.user?._id).select("-password");

  if (!user) {
    throw CreateApiError(400, "User Not Found");
  }

  return res.json(ApiResponse(200, user, "User fetched successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUser,
};
