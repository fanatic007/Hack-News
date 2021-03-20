const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
Datastore = require('nedb');
log=console.log;


app.use(cors());
app.use(bodyParser.json());

app.listen(port, function () {
  console.log(`CORS-enabled web server listening on port ${port}`)
})

const challenges = new Datastore({ filename: 'challenges.db', autoload: true });

const ENDPOINT = '/challenges/';
//Get Challenges ordered by optional param
app.get(ENDPOINT, (req, res) => {
  challenges.find({},(err,result)=>{
    if(err){log(err);
      res.send({status:'failure'});
    }
    else{
      res.send(result);
    }
  })
});

//Add Challenges
app.post(ENDPOINT, (req, res) => {
  challenges.insert({...req.body, creationDate:new Date(), upvoters:[]},(err, result) => {
    if(err){log(err);
      res.send({status:'failure'});
    }
    else{
      res.send({status:'success', id:result.id});
    }
  });
});

//Upvote Challenge (upvoted object to be sent)
app.put(ENDPOINT,(req, res) => {
  let update = req.body.upvote?{$addToSet: {upvoters: req.headers['employeeid']} }:{$pull: {upvoters: req.headers['employeeid'] } };
  challenges.update({_id: req.body._id}, update ,{},(err, result) => {
    if(err){log(err);
      res.send({status:'failure'});
    }
    else{
      res.send({status:'success', id:result.id});
    }
  });
});

//Upvote Challenge (upvoted object to be sent)
app.post('/login/',(req, res) => {
  res.send({token:'abcd', role:'admin'});
});