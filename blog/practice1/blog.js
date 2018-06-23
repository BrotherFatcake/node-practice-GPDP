
//**Route file setups**

//Create a constant to import(require) Express
const express = require('express');

//Create a constant named router to call Express Router
const router = express.Router();

//Create const of bodyParser and require body-parser to parse POST/PUT values
const bodyParser = require('body-parser');

//Create const called jsonParser to call bodyParser and parse json requests
const jsonParser = bodyParser.json();

//Create const object of imported/required object array in models file - this goes at END of file
const {BlogPosts} = require('./models');


//Create test data to create example objects to GET immediately **this is not needed when using a DB**

BlogPosts.create(
    'test title',
    'test content abcdef',
    'test author'
);

BlogPosts.create(
    'test title other',
    'test content abcdef other',
    'test author other'
);




//GET
// GET request to 'url.com/endpoint' to retrieve all items at endpoint

router.get('/', (req, res)  =>  {
    res.status(200).json(BlogPosts);
})


//OR

// GET request to 'url.com/endpoint/123456789' to retrieve specific item at endpoint + :id
router.get('/:id', (req, res)   =>  {

    // create const that assigns request param id to new const
    const searchID = req.params.id;

    // create unassigned variable to hold matching search data and to send in response
    let respData;

    // loop through data array to find the item ID that matches URL request param id
    for(let i=0; i<BlogPosts.posts.length; i++)   {

    // if searchID (request param id) is found to match item key value ID, set the item object to //previous unassigned variable
        if(searchID === BlogPosts.posts[i].id)    {
            respData = BlogPosts.posts[i];

        }
    }
    // responds with the requested object data values
    console.log(respData)
    res.status(200).json(respData);
    
});

//POST

//create post function to listen at named endpoint //identify endpoint, call jsonParser before req, res args
router.post('/', jsonParser, (req, res)   =>   {

    //create const for array of required POST fields

    const requiredFields = ['title', 'content', 'author'];

    //loop through json object keys presented in request the length of requiredFields
    for(let i=0; i<requiredFields.length; i++)  {

        //create const to check for field existing using IF statement at current array position i
        const field = requiredFields[i];   
        //if not field in request body //send message if field/s missing //log error message to console
        if(!(field in req.body))    {

            //respond with 400 status and send error message in json response
            console.error(`${field} is not in the request`);
            res.status(400);
        }
        //if field in request 
        //create const to create item with the request data object in request by passing it to endpoint.create
        else {
          
            const item = BlogPosts.create(req.body.title, req.body.content, req.body.author);
            
            //respond with status 200 and json object item
            res.status(200).json(item);

        }
    }

    
});


//DELETE
//Like GET and POST, DELETE will call similar endpoint but in example calling path variable for id of item to be deleted

//Will provide the id to endpoint.delete(); //localhost:8080/endpoint/:id

//create delete function to listen at named endpoint + :id
    router.delete('/:id', (req, res)    =>  {

    //call delete operation and include the id from the request params (not request body)
        BlogPosts.delete(req.params.id);
    //log a message stating item was deleted and include the id in the request params (not request body)
        console.log(`${req.params.id} has been removed`);
    //respond with 200 status and end
        res.status(200).end();
    
    
})


//PUT (update)
//Like DELETE we'll call similar endpoint but in example calling path variable for id of item to be updated

//Like POST will need to parse data sent by client and validate that required fields are present, if correct will call update operation

//create put function to listen at named endpoint + :id //identify endpoint, call jsonParser before req, res args
router.put('/:id', jsonParser, (req, res)   =>  {

    //create constant to identify array of requiredFields
    const requiredFields = ['id', 'title', 'content', 'author'];
    
    //loop through json object keys presented in request the length of requiredFields
    for(let i =0; i<requiredFields.length; i++) {

        //create const of field of requiredFields[i] to be used to check field at array[i] exists in IF statement
        const field = requiredFields[i];

        //if not field in request body
        if(!(field in req.body)) {
         //log error message to console with message that field is missing
            console.error(`${field} is not in the request`);
         //respond with 400 status and send error message in json response
         res.status(400);
        }
    };
        
        //check if the request param ID is NOT equal to the request body ID, log an error and return 400 status
        if(req.params.id !== req.body.id){
            console.error(`${req.params.id} and ${req.body.id} must match`);
            res.status(400).end();
        }  
        else{
            //when ID matches log message of update to request param ID
            console.log(`${req.params.id} will be updated.`);

            //call update operation with object of request param id and request body object key/values

            BlogPosts.update({
                id: req.params.id,
                title: req.body.title,
                content: req.body.content,
                author: req.body.author
            });
            
            //respond with status 204 and end
            res.status(200).end();
            };
});
    
    
//module exports router
module.exports = router;