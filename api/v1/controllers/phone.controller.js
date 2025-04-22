const Phone = require("../models/phone.model")
const searchHelper = require("../../../helpers/search")
module.exports.index = async (req, res) => {
    let find = {};
    //Search
    if (req.query.keyword) {
        const keyword = searchHelper(req.query);
        find.name = keyword.RegExp;
    }
    //End search
    const phones = await Phone.find(find);
    res.send(phones)
}