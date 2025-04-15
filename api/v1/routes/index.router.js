const systemConfig = require("../../../config/system");
const taskRoute = require("./task.router")
module.exports = (app) => {
    const PATH = systemConfig.PATH;
    app.use(PATH + "/task", taskRoute);
}