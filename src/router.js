const express = require('express');
const router = express.Router();

const commnetController = require('./api/comment/controller');

router.post('/comment/add',commnetController.add);
router.get('/comment/list',commnetController.list);

const boardController = require('./api/board/controller');

router.post('/board/add',boardController.add);
router.get('/board/list',boardController.list);
router.post('/board/detail',boardController.detail);

module.exports= router;