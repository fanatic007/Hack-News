express = require('express');
bodyParser = require('body-parser');
Datastore = require('nedb');
log=console.log;

const ENDPOINT = '/challenges/';
const app = express();
const port = 3000;
const challenges = new Datastore({ filename: 'challenges.db', autoload: true });

app.use(bodyParser.json());

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
  challenges.insert(req.body,(err, result) => {
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
  challenges.update(req.body, {$inc:{upvotes:1}} ,{},(err, result) => {
    if(err){log(err);
      res.send({status:'failure'});
    }
    else{
      res.send({status:'success', id:result.id});
    }
  });
});

app.listen(port, () => {
  console.log(`Hack News server started and listening at http://localhost:${port}`)
})