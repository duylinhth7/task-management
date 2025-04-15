const Tasks = require("../models/tasks.model")
const panigationHelper = require("../../../helpers/panigation")

// [GET] /
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    if(req.query.status){
        find.status = req.query.status;
    };

    // sort
    const sort = {};
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue
    }
    // end sort

    //panigation
    const countTasks = await Tasks.countDocuments(find);
    const objectPanigation = panigationHelper(
        {
            currentPage: 1,
            limitItems: 2,
        },
        req.query,
        countTasks
    );
    //end panigation

    const task = await Tasks.find(find).skip(objectPanigation.skipItems).limit(objectPanigation.limitItems).sort(sort);
    res.json(task)
}

//[GET] /detail/:id
module.exports.detail = async (req, res) => {
    const task = await Tasks.find({
        _id: id,
        deleted: false
    })
    res.json(task)
}