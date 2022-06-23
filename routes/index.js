var express = require('express')
var router = express()
const { pool } = require('../dbconfig')

// const SphericalMercator = require("sphericalmercator")
// const mercator = new SphericalMercator()

router.use(express.static("./"))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Plan Inventory System' });
});


//JSon Server

router.get('/dzongkhags', (req, res) => {
  pool.query(`SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(features.feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'geometry',   ST_AsGeoJSON(geom)::jsonb,
        'properties', to_jsonb(inputs)  - 'geom'
      ) AS feature  
      FROM (SELECT * FROM geowgs) inputs) features;`, (err, results) => {
    if (err) {
      throw err
    }
    res.send(results.rows[0].jsonb_build_object)
  })
})

module.exports = router;
