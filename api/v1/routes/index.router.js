const systemConfig = require("../../../config/system");
const taskRoute = require("./task.router");
const userRoute = require("./user.route")
module.exports = (app) => {
    const PATH_V1 = systemConfig.PATH;
    app.use(PATH_V1 + "/task", taskRoute);
    app.use(PATH_V1 + "/user", userRoute);
}