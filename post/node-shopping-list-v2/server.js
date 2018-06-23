
const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {ShoppingList, Recipes} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to ShoppingList
// so there's some data to look at
ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);

// adding some recipes to `Recipes` so there's something
// to retrieve.
Recipes.create(
  'boiled white rice', ['1 cup white rice', '2 cups water', 'pinch of salt']);
Recipes.create(
  'milkshake', ['2 tbsp cocoa', '2 cups vanilla ice cream', '1 cup milk']);

// when the root of this router is called with GET, return
// all current ShoppingList items
app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
});

app.post('/shopping-list', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['name', 'budget'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = ShoppingList.create(req.body.name, req.body.budget);
  res.status(201).json(item);
});


app.get('/recipes', (req, res) => {
  res.json(Recipes.get());
})



//create post function to listen for the post at junkData endpoint
    //identify endpoint, call jsonParser before req, res args
app.post('/recipes', jsonParser, (req, res) =>  {

    //create const for required POST fields
    const requiredFields = ['name', 'ingredients'];

  //loop through json object keys presented in POST
  for(let i=0; i<requiredFields.length; i++) {
    
    //create const to check for field existing using IF statement b
    const field = requiredFields[i];
    
    //if not field in request body
    if(!(field in req.body))  { 
      //send message if field/s missing
      //log error message to console
      
       console.error(`${field} is missing`);
      //return 400 status and send error message in json response
        res.status(400);
    }

      else {
        //if field in response 
        //create const to create item with the request name and ingredient in request by passing it to functionName.create
        const item = Recipes.create(req.body.name, req.body.ingredients);

        //respond status 200 and json object item
        res.status(200).json(item);

      };
  };
    
    
    
    
  
  
})
  
app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
