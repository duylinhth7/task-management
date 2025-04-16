//register
module.exports.register = (req, res, next) => {
    if (!req.body.fullName) {
        res.json({
            code: 400,
            message: "Vui lòng nhập đầy đủ thông tin!"
        });
        return;
    }
    if (!req.body.email) {
        res.json({
            code: 400,
            message: "Vui lòng nhập đầy đủ thông tin!"
        });
        return;
    };
    if (!req.body.password) {
        res.json({
            code: 400,
            message: "Vui lòng nhập đầy đủ thông tin!"
        });
        return;
    };
    next();
}
//end register

//login
module.exports.login = (req, res, next) => {
    if (!req.body.email) {
        res.json({
            code: 400,
            message: "Vui lòng nhập đầy đủ thông tin!"
        });
        return;
    };
    if (!req.body.password) {
        res.json({
            code: 400,
            message: "Vui lòng nhập đầy đủ thông tin!"
        });
        return;
    };
    next();
}
//end login

//forgetPassword
module.exports.forgetPassword = (req, res, next) => {
    if (!req.body.email) {
        res.json({
            code: 400,
            message: "Vui lòng nhập đầy đủ thông tin!"
        });
        return;
    };
    next();
}
//end forgetPassword

//otp password
module.exports.otpPassword = (req, res, next) => {
    if (!req.body.email) {
        res.json({
            code: 400,
            message: "Không có email!"
        });
        return;
    };
    if (!req.body.otp) {
        res.json({
            code: 400,
            message: "Không có OTP!"
        });
        return;
    };
    next();
}
//end otp password

//reset password
module.exports.resetPassword = (req, res, next) => {
    if(!req.body.password){
        res.json({
            code: 200,
            message: "Vui lòng nhập mật khẩu mới!"
        });
        return;
    }
    if(!req.body.authPassword){
        res.json({
            code: 200,
            message: "Vui lòng nhập xác thực mật khẩu mới!"
        });
        return;
    };
    if(req.body.password != req.body.authPassword){
        res.json({
            code: 200,
            message: "Xác thực mật khẩu mới không trùng với mật khẩu mới!"
        });
        return;
    };
    next();
}
//end reset password