const express=require('express');
const router=express.Router();

const homeController=require('../controllers/home-controller');

console.log(homeController);
router.get('/',homeController.home);

router.use('/users',require('./users'));
router.use('/posts',require('./post'))
router.use('/comments',require('./comment'));
//for any furthur route ,access from here
// router.use('/routername',routerfile);
module.exports=router;