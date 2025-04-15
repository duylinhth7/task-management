const Tasks = require("../models/tasks.model");
const panigationHelper = require("../../../helpers/panigation");
const searchHelper = require("../../../helpers/search");

// [GET] /
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    if (req.query.status) {
        find.status = req.query.status;
    };

    // sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
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

    //search
    if (req.query.keyword) {
        const keyword = searchHelper(req.query);
        find.title = keyword.RegExp;
    }
    // end search

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

//[PATCH] /change-status
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    const status = req.body.status;
    if (status) {
        try {
            await Tasks.updateOne({
                _id: id
            }, {
                status: status
            });
            res.json({
                code: 200,
                message: "Cập nhật trạng thái thành công"
            })
        } catch (error) {
            res.json({
                code: 400,
                message: "Cập nhật thất bại"
            })
        }
    }
}


//PATCH /change-mutil
module.exports.changeMutil = async (req, res) => {
    //destructuring - phá vỡ cấu trúc
    const {ids, key, value} = req.body;
    try {
        switch(key) {
            case "status":
                await Tasks.updateMany({
                    _id: {$in: ids}
                }, {
                    status: value
                })
                res.json({
                    code: 200,
                    message: "Thay  đổi trang thái thành công"
                })
        }
    } catch (error) {
        res.json({
            code: 300,
            message: "Thay  đổi trang thái không thành công"
        })
    }

}