const Phone = require("../models/phone.model")
const searchHelper = require("../../../helpers/search")

//[GET] /api/v1/phone
module.exports.index = async (req, res) => {
    let find = {};
    //Search
    if (req.query.keyword) {
        const keyword = searchHelper(req.query);
        find.name = keyword.RegExp;
    }
    //End search

    //sort
    let sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }
    //end sort
    const phones = await Phone.find(find).sort(sort);
    res.send(phones)
}

//[GET] /api/v1/phone/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const phone = await Phone.findOne({
            _id: id
        });
        res.json(phone)
    } catch (error) {
        
    }
}

