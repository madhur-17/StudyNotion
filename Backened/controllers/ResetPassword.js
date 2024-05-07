const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(500).json({
        success: false,
        message: "Please enter email",
      });
    }
    const user = await User.findOne({ email:email });
 
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "Please enter correct email",
      });
    }

    const token = crypto.randomUUID();
    const updateDetails = await User.findOneAndUpdate(
      { email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      {
        new: true,
      }
    );

    const url = `http://localhost:5173/update-password/${token}`;

    await mailSender(email, "Password Reset Link", `${url}`);
    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in reset password",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    if (password != confirmPassword) {
      return res.json({
        success: false,
        message: "password do not match",
      });
    }
    const user = await User.findOne({ token });
    if (!user) {
      return res.json({
        success: false,
        message: "user not exist",
      });
    }
    if (user.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "token expired",
      });
    }

    const hashpaswword = await bcrypt.hash(password, 10);
    const update = User.findByIdAndUpdate(
      { token },
      {
        password: hashpaswword,
      },
      {
        new: true,
      }
    );
    return res.json({
        success:true,
        message:"reset password"
    })
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error in reset password",
    });
  }
};
