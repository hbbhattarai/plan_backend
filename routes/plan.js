const Plan = require('../src/models').plans;
var express = require('express')
var router = express()
const multer = require('multer');

router.use(express.static("public"));
router.use(express.urlencoded({ extended: true }));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const maxSize = 10 * 1024 * 1024;
const compressFileUpload = multer({
    storage,
    limits: {
        filesize: maxSize,
    },
});

router.post('/create-plan', compressFileUpload.fields([{ name: 'datafile', maxCount: 1 }, { name: 'report', maxCount: 1 },]), function (req, res) {
    const data = req.body
    data.data_url = req.files.datafile[0].path
    data.report_url = req.files.report[0].path
    return Plan
        .create(data)
        .then(plan => res.status(201).json({ plan, msg: "Plan is created successfully" }))
        .catch(error => res.status(400).json({
            error,
            msg: "Some error occurred while creating the Plan"
        }));
});

router.get('/get-all-plans', function (req, res) {
    return Plan
        .findAll()
        .then(plans => res.status(201).json({ plans, msg: "Plan is retrieving successfully" }))
        .catch(error => res.status(400).json({
            error,
            msg: "Some error occurred while retrieving the Plan"
        }));
})

router.get('/get-plan/:id', function (req, res) {
    const id = req.params.id;
    return Plan
        .findByPk(id)
        .then(plan => res.status(201).json({ plan, msg: "Plan is retrieving successfully" }))
        .catch(error => res.status(400).json({
            error,
            msg: "Some error occurred while retrieving the Plan"
        }));
})

router.get('/get-plan/dzongkhag/:id', function (req, res) {
    const id = req.params.id;
    return Plan
        .findAll({
            where: {
                dzongkhag_id: id
            }
        })
        .then(plans => res.status(201).json({ plans, msg: "Plan is retrieving successfully" }))
        .catch(error => res.status(400).json({
            error,
            msg: "Some error occurred while retrieving the Plan"
        }));
})
router.put('/update-plan/:id', compressFileUpload.fields([{ name: 'datafile', maxCount: 1 }, { name: 'report', maxCount: 1 },]), function (req, res) {
    const id = req.params.id;
    const data = req.body
    data.data_url = req.files.datafile[0].path
    data.report_url = req.files.report[0].path
    return Plan
        .update(data, {
            where: { id: id }
        })
        .then(plan => res.status(201).json({ plan, msg: "Plan is updating successfully" }))
        .catch(error => res.status(400).json({
            error,
            msg: "Some error occurred while updating the Plan"
        }));
})
router.delete('/delete-plan/:id', function (req, res) {
    const id = req.params.id;
    return Plan
        .destroy({
            where: { id: id }
        })
        .then(plan => res.status(201).json({ plan, msg: "Plan is deleted successfully" }))
        .catch(error => res.status(400).json({
            error,
            msg: "Some error occurred while deleted the Plan"
        }));
})


module.exports = router