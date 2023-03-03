const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const saucesCtrl = require('../controllers/sauces.controller');
const multer = require('../middleware/multer-config.middleware');


router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getSpecificSauce);
router.post('/', auth, multer, saucesCtrl.addSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.likedSauce);

module.exports = router;