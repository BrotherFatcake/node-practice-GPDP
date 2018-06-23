//Create a constant to import(require) Express
    const express = require('express');

//Create a constant to import/require Morgan for logging
    const morgan = require('morgan');

//Create constant that creates a new app instance by calling top level Express function
    const app = express();

//**When using Express Routing-** Create const values to import/require module JS files (moduleOneRouter.js & moduleTwoRouter.js - the .js is not used to setup the params)

    const blogRouter = require('./blog');

//Tell app to use morgan for common http logging
    app.use(morgan('common'));
    
//Tell app to use express static location of public for static assets
    app.use(express.static('public'));

//**When using Express Routing-** Tell app to use specific endpoints for the appropriate /moduleOne and /moduleTwo routers

    app.use('/blog', blogRouter);

//Listen for requests and log when server started

    app.listen(process.env.PORT || 8080, () => {
        console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
    });


