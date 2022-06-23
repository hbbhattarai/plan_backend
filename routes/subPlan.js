var express = require('express')
const subPlanController = require('../controllers/subPlanController')
var router = express()

router.post('/create-sub-plan', subPlanController.create)

router.get('/get-all-sub-plans', subPlanController.findAll)

router.get('/get-sub-plan-planId/:id', subPlanController.findByPlan)

router.get('/get-sub-plan/:id', subPlanController.findOne)

router.put('/update-sub-plan/:id', subPlanController.update)

router.delete('/delete-sub-plan/:id', subPlanController.delete)


module.exports = router