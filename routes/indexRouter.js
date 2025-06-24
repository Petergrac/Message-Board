const { Router } = require("express");

// Route instance
const indexRouter = Router();

// Data
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get('/',(req,res,next)=>{
    // Rendering the index template
    res.render('index',{
        title: 'Mini Messageboard', // Title of my page
        messages: messages // passing the message array
    })
} );
indexRouter.post('/new',(req,res)=>{

  // Reading data from the form submission
  const user = req.body.userName;
  const text = req.body.messageText;

  // Appending data to our database
  messages.push({text: text,user: user, added: new Date()});

  // Redirect to users page
  res.redirect('/');
})

module.exports = indexRouter;