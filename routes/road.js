
var express = require('express')
var router = express()
var cors = require('cors')

vtpbf = require('vt-pbf');
geojsonVt = require('geojson-vt');
var zlib = require('zlib')


const { pool } = require('../dbconfig');


router.use(cors())

router.get('/roads/:z/:x/:y.pbf', (req, res) => {
    var table = "roads";
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
      FROM (SELECT * FROM ${table}) inputs) features;`, (err, results) => {
        if (err) {
            throw err
        } else {
            var GeoJSON = results.rows[0].jsonb_build_object;
            var tileindex = geojsonVt(GeoJSON);
            var tile = tileindex.getTile(parseInt(req.params.z), parseInt(req.params.x), parseInt(req.params.y));
            try {
                var buff = vtpbf.fromGeojsonVt({ [table]: tile })
                zlib.gzip(buff, function (err, pbf) {
    
                    if (err) {
                        res.send({ err, msg: 'Error while creating pbf' })
                    } else {
                        res.setHeader("Content-Encoding", 'gzip')
                        res.setHeader("Access-Control-Allow-Origin", "*")
                        res.setHeader("Content-type", "application/x-protobuf")
                        res.send(pbf);
                    }
    
                })
                
            } catch (error) {
                res.send({ error, msg: 'Error while creating buff' })
                
            }

        }

    })
});
module.exports = router;

