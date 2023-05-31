const express = require('express');
const user_login_auth = require('../../helper/user_login_auth');
const userController = require('../webservices/user.controller');

const userRouter = express.Router();

// GET API'S
userRouter.get('/', userController.index);

// POST API'S
userRouter.post('/signUp', userController.signUp);
userRouter.post('/signIn', userController.signIn);

userRouter.post('/genarated_ticket_by_user', user_login_auth.authntication, userController.genarated_ticket_by_user);
userRouter.get('/all_tickets', userController.all_tickets);
module.exports = userRouter;
