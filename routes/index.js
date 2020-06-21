const express=require('express');
const router=express.Router();

const homeController=require('../controllers/home-controller');

console.log(homeController);
router.get('/',homeController.home);

router.use('/users',require('./users'));
router.use('/posts',require('./post'))
router.use('/comments',require('./comment'));
router.use('/likes',require('./likes'));
//for any furthur route ,access from here
// router.use('/routername',routerfile);

router.use('/api',require('./api'));

module.exports=router;