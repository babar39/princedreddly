const express = require("express");
const app = express();
var jquery = require('jquery');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const ngrok = require('ngrok');

live = false // disable if using nodemon

// Use ngrok
if (live) {    
    (async function() {
        const url = await ngrok.connect();
        date = new Date();
        
        console.clear();
        console.log('Server started at ' + date.toUTCString());
        console.log("http://localhost:4040/inspect/\n");
        console.log("Click link to go to server =>      " + url + "/");
        
    })();
}



//use
app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());


//default extentions
app.set('view engine', 'ejs');
app.set('css engine', 'scss');


/* Post *\
\*      */
app.post('/games/postGame', urlencodedParser, (req, res) => {
    console.log(req.body);

});


/* Routes *\
\*        */

//home
app.get('/', (req, res) => {
    res.render("home");
});


/* Routes *\
\*  games */
//games
app.get('/games', (req, res) => {
    res.render("games");
});

app.get('/games/:gamePage', (req, res) => {
    const gamepage = req.params.gamePage;
    res.render("games/" + gamepage);
});

app.use('/games/*', (error, req, res, next) => {
    res.status(500);
    res.render('games/gameNotListed', {
        title: '500: Internal Server Error',
        error: error
    });
});

/* Routes *\
\*  media */
//media
app.get('/media', (req, res) => {
    res.render("media");
});

/* Routes *\
\*  tools */
//tools
app.get('/tools', (req, res) => {
    res.render("tools");
});

/* Routes *\
\*   me   */
//me
app.get('/me', (req, res) => {
    res.render("me");
});


/* Routes *\
\* ERRORS */
//ERROR_404
app.get('*', (req, res) => {
    res.render("Error404");
});

/////////////////////////////////////////



/* Start Server on port 80 *\
\*                         */
app.listen(80, () => {
    date = new Date();
    return console.log('Server ready at ' + date);
    
});