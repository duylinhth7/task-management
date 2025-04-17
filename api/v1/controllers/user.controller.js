const User = require("../models/user.model")
const md5 = require("md5");
const genarateHelper = require("../../../helpers/genarate");
const ForgetPassword = require("../models/forget-password.model");
const sendMailHelper = require("../../../helpers/sendMail");
//[POST] /api/v4/register
module.exports.register = async (req, res) => {
    try {
        const email = req.body.email;
        const exitsEmail = await User.findOne({
            email: email,
            deleted: false
        });
        if (exitsEmail) {
            res.json({
                code: 400,
                message: "Email này đã tồn tại!"
            });
            return;
        } else {
            req.body.password = md5(req.body.password);
            req.body.token = genarateHelper.genarateToken(20);
            const newUser = new User(req.body);
            await newUser.save();
            res.cookie("token", newUser.token);
            res.json({
                code: 200,
                message: "Tạo tài khoản thành công!"
            })
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}

//POST api/v4/login
module.exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        const checkEmail = await User.findOne({
            email: email
        });
        if (!checkEmail) {
            res.json({
                code: 400,
                message: "Email đã nhập không tồn tại!"
            });
            return;
        } else {
            const user = await User.findOne({
                email: email,
                password: md5(req.body.password)
            });
            if (!user) {
                res.json({
                    code: 400,
                    message: "Bạn đã nhập sai mật khẩu!"
                });
                return;
            } else {
                res.cookie("token", user.token);
                res.json({
                    code: 200,
                    message: "Đăng nhập thành công!"
                })
            }
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}

//POST api/v4/password/forget
module.exports.forgetPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const exitsEmail = await User.findOne({
            email: email,
            deleted: false
        });
        if (!exitsEmail) {
            res.json({
                code: 400,
                message: "Email đã nhập không tồn tại!"
            });
            return;
        };
        if (exitsEmail.status != "active") {
            res.json({
                code: 400,
                message: "Tài khoản này đã bị khóa!"
            });
            return;
        };
        const otp = genarateHelper.genarateNumber(5);
        const objectForgetPassword = {
            email: email,
            otp: otp,
            expireAt: Date.now()
        };
        const forgetPassword = new ForgetPassword(objectForgetPassword);
        await forgetPassword.save();

        //Gửi mail xác nhận OTP;
        const subject = "Mã OTP xác minh đặt lại mật khẩu!";
        const html = `Mã OTP để cập nhật lại mật khẩu là <b>${otp}</b>. Thời hạn của mã OTP này là 5 phút!`
        sendMailHelper.sendMail(email, subject, html);
        res.json({
            code: 200,
            message: `Đã gửi mã OTP qua email ${email}`
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lối!"
        })
    }
}

//POST api/v4/password/otp
module.exports.otpPassword = async (req, res) => {
    try {
        const email = req.body.email;
        const checkOtp = await ForgetPassword.findOne({
            email: email,
            otp: req.body.otp
        });
        if (!checkOtp) {
            res.json({
                code: 400,
                message: "Bạn đã nhập sai mã OTP!"
            }); return;
        } else {
            const user = await User.findOne({
                email: email
            });
            res.cookie("token", user.token);
            res.json({
                code: 200,
                message: "OTP hợp lệ!"
            });
        };
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        }); return;
    }
}

//POST api/v4/password/reset
module.exports.resetPassword = async (req, res) => {
    try {
        const newPassword = md5(req.body.password);
        const token = req.cookies.token;
        await User.updateOne({
            token: token
        }, {
            password: newPassword
        });
        res.json({
            code: 200,
            message: "Thay đổi mật khẩu thành công!"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}

//[GET] api/v1/detail
module.exports.detail = async (req, res) => {
    try {
        const user = req.user;
        res.json({
            code: 200,
            user: user
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Lỗi!"
        })
    }
}