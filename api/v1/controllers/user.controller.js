const User = require("../models/user.model")
const md5 = require("md5");

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
            message: "Tạo tài khoản không thành công!"
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
            } else{
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