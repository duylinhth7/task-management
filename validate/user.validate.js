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