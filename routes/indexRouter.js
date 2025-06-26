const { Router } = require("express");
const indexController = require('../controller/indexController')

// Route instance
const indexRouter = Router();

indexRouter.get('/', indexController.getUsers);
indexRouter.post('/new', indexController.addUsers);
indexRouter.post('/delete/:id', indexController.removeUser);
module.exports = indexRouter;