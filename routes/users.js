const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/users-controller');


router.get('/profile/:id',passport.checkAuthentication,userController.profile);
router.post('/update/:id',passport.checkAuthentication,userController.update);


router.get('/signin',userController.sign_in);

router.get('/signup',userController.sign_up);

router.post('/create', userController.create);

router.get('/signout',userController.destroyedSession);

//router.post('/create-session',userController.createSession);


//use  passport as a middle ware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'users/signin'},
), userController.createSession);


module.exports=router;