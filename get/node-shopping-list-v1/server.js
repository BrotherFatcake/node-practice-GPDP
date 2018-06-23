
const express = require('express');
// we'll use morgan to log the HTTP layer
const morgan = require('morgan');
// we'll use body-parser's json() method to 
// parse JSON data sent in requests to this app
const bodyParser = require('body-parser');

// we import the ShoppingList model, which we'll
// interact with in our GET endpoint
const {ShoppingList} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to ShoppingList
// so there's some data to look at. Note that 
// normally you wouldn't do this. Usually your
// server will simply expose the state of the
// underlying database.
ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);

// when the root of this route is called with GET, return
// all current ShoppingList items by calling `ShoppingList.get()`
app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
});




const recipeList = 
[
  {
      "name": "boiled white rice",
      "id": "c53003fa-63ee-4344-bae9-f9f4f0594929",
      "ingredients": [
          "1 cup white rice",
          "2 cups water",
          "pinch of salt"
      ]
  },
  {
      "name": "milkshake",
      "id": "edc07a41-ac7d-49e2-8e56-835ad16d91da",
      "ingredients": [
          "2 tbsp cocoa",
          "2 cups vanilla ice cream",
          "1 cup milk"
      ]
  }
];

/*
Recipes.create(
  'boiled white rice', ['1 cup white rice', '2 cups water', 'pinch of salt']);
Recipes.create(
  'milkshake', ['2 tbsp cocoa', '2 cups vanilla ice cream', '1 cup milk']);
*/



//GET request that returns all array items as json object
app.get('/recipes', (req, res) => {
  res.status(200).json(recipeList)
})


// GET request to 'url.com/123456789' to retrieve specific item at endpoint + :id
app.get('/recipes/:id', (req, res)  =>  {

  // create const that assigns request param id to new const
  const searchID = req.params.id;

  // create unassigned variable to hold matching search data and to send in response
  let itemID;

  // loop through data array to find the item ID that matches URL request param id
  for(let i=0; i<recipeList.length; i++)  {

    // if searchID (request param id) is found to match item key value ID, set the item object to 
      //previous unassigned variable
    if(searchID === recipeList[i].id)  {
        itemID = recipeList[i];
    }
   }

   // responds with the requested object data values
   res.status(200).json(itemID);

});


  

       
     











app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
