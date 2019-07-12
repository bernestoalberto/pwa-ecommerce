//    Copyright 2017 Google
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

const express = require('express');
const path = require('path');
let mongod = require('./nosql');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.all('/checkout/', (req, res) => {
  res.sendStatus(200);
});
function getdate() {
  var date = new Date();
  var d = date.getFullYear()+"-"+((date.getMonth() < 10) ? "0"+date.getMonth() : date.getMonth())+"-"+((date.getDate() < 10) ? "0"+date.getDate() : date.getDate())+" "+date.getHours()+":"+date.getMinutes()+":"+((date.getSeconds()<10) ? "0"+date.getSeconds() : date.getSeconds())+"."+date.getMilliseconds();
  return d;
}
const isValidSaveRequest = (req, res) => {
  // Check the request body has at least an endpoint.
  if (!req.body || !req.body.endpoint) {
    // Not a valid subscription.
    res.status(400);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      error: {
        id: 'no-endpoint',
        message: 'Subscription must have an endpoint.'
      }
    }));
    return false;
  }
  return true;
};

app.post('/save-subscription/', function (req, res) {
  if (!isValidSaveRequest(req, res)) {
    return;
  }

  return saveSubscriptionToDatabase(req.body).then(function(subscriptionId) {
    res.setHeader('Content-Type', 'application/json');
    console.log(subscriptionId);
    res.send(JSON.stringify({ data: { success: true } }));
  })
  .catch(function(err) {
    res.status(500);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
      error: {
        id: 'unable-to-save-subscription',
        message: 'The subscription was received but we were unable to save it to our database.'
      }
    }));
  });
});

function saveSubscriptionToDatabase(subscription) {
  return new Promise(function(resolve, reject) {
    mongod.insertData(subscription.endpoint,['subs',subscription.endpoint],getdate()).then((newDoc)=>{

      resolve(newDoc._id);
    });
  });
};





const PORT = process.env.PORT || 3003;
app.listen(PORT);








console.log(`Started a local server at http://localhost:${PORT}`);
