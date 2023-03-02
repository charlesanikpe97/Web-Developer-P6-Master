const express = require('express');
const router = express.Router();
const auth = require('jsonwebtoken');


router.get('/', auth, (req, res, next)=>{

});

router.get('/:id', auth, (req, res, next)=>{

});

router.post('/', auth, (req, res, next)=>{

});

router.put('/:id', auth, (req, res, next)=>{

});

router.delete('/:id', auth, (req, res, next)=>{

});

router.post('/:id/like', auth, (req, res, next)=>{

});

module.exports = router;