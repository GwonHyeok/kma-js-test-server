/**
 * Created by GwonHyeok on 2016. 8. 2..
 */
const express = require('express');
const router = express.Router();

const kmaWeather = require('kma-js').Weather;

router.get('/', function (req, res) {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    var error;

    if (!latitude || !longitude) {
        error = {
            status: 'ValidationError',
            code: 403,
            title: '필수 파라미터 없음',
            detail: '위, 경도 데이터가 없습니다, 쿼리스트링에 latitude 와 longitude 를 추가해주세요'
        };

        res.status(error.code);
        res.json({error: error})
    } else {
        kmaWeather.townWeather(latitude, longitude)
            .then(function (data) {
                res.status(200);
                res.json({data: data})
            })
            .catch(function (error) {
                res.status(500);
                res.json({error: error})
            });
    }
});

module.exports = router;