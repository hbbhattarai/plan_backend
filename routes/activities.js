const Activity = require('../src/models').activity;
var express = require('express')
var router = express()

router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));


router.post('/create-activity', function (req, res) {
    const data = req.body
    console.log(data);
    return Activity
        .create(data)
        .then(activity => res.status(201).json({ activity, msg: "Activity is created successfully" }))
        .catch(error => res.status(400).json({
            error,
            msg: "Some error occurred while creating the Activity"
        }));
});

router.get('/get-all-activities', function (req, res) {
    return Activity
        .findAll()
        .then(activities => res.status(201).json({ activities, msg: "Activity is retrieving successfully" }))
        .catch(error => res.status(400).json({
            error,
            msg: "Some error occurred while retrieving the Activity"
        }));
})

router.get('/get-activity/:id', function (req, res) {
    const id = req.params.id;
    return Activity
        .findByPk(id)
        .then(activity => res.status(201).json({ activity, msg: "Activity is retrieving successfully" }))
        .catch(error => res.status(400).json({
            error,
            msg: "Some error occurred while retrieving the Activity"
        }));
})

router.get('/get-activity/plan/:id', function (req, res) {
    const id = req.params.id;
    return Activity
        .findAll({
            where: {
                plan_id: id
            }
        })
        .then(activities => res.status(201).json({ activities, msg: "Activity is retrieving successfully" }))
        .catch(error => res.status(400).json({
            error,
            msg: "Some error occurred while retrieving the Activity"
        }));
})
router.put('/update-activity/:id', function (req, res) {
    const id = req.params.id;
    const data = req.body
    return Activity
        .update(data, {
            where: { id: id }
        })
        .then(activity => res.status(201).json({ activity, msg: "Activity is updating successfully" }))
        .catch(error => res.status(400).json({
            error,
            msg: "Some error occurred while updating the Activity"
        }));
})
router.delete('/delete-activity/:id', function (req, res) {
    const id = req.params.id;
    return Activity
        .destroy({
            where: { id: id }
        })
        .then(activity => res.status(201).json({ activity, msg: "Activity is deleted successfully" }))
        .catch(error => res.status(400).json({
            error,
            msg: "Some error occurred while deleted the Activity"
        }));
})


module.exports = router