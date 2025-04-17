const User = require("../api/v1/models/user.model");

module.exports = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const user = await User.findOne({
            token: token,
            status: "active"
        }).select("-password");
        if (user) {
            req.user = user
            next();
        } else{
            res.json({
                code: 400,
                message: "TOKEN không hợp lệ!"
            })
        }
    } else {
        res.json({
            code: 400,
            message: "Vui lòng gửi lên TOKEN!"
        });
        return;
    };
}