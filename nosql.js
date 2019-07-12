//let MongoClient = require('mongodb').MongoClient;
const config  = require('./.config/config.json');
  const mongoose =  require('mongoose');
let url = config.local.mongo_db;
const  bcrypt = require('bcrypt');
const saltRounds = 10;

mongoose.connect(url, {useNewUrlParser: true});
// change on production the da name sessions by admin
let db = mongoose.connection;
let User,Schema,UserSchema,user,PushMessages,PushMessagesSchema,cookie = '';
db.on('error', console.error.bind(console,'MongoDB  connection error:'));
db.once('open',async function () {
    console.log('We are connected to Mongo DB');
    Schema = mongoose.Schema;
    ObjectId = Schema.ObjectId;
     //mongo.findUser({email: 'ebonetmoncada@gmail.com'});
     //mongo.createPushMessagesCollection();
      //mongo.findAll();
      //mongo.insertData( 'ebonet34@acs.com','em','rtyu');
     //await mongo.updateUsername('ebonet', 'ebonet88');
     //await mongo.updatePasswordbyEmail('bernestoalberto@gmail.com', 'Pop');
     //await mongo.updatePasswordbyUsername('ebonet88', 'Popi');
     //await mongo.updateEmail("ebonet@acslabtest.com","bernestoalberto@gmail.com");

     //await mongo.deleteOneUserbyId( 'sunny');
    //await mongo.deleteOneUserbyPassword(11.5);
    //await mongo.deleteOneUserbyUsername(11.5);
});

let mongo = {
    createUSerCollection: function() {
// Use connect method to connect to the server
        UserSchema =   new Schema({
            email: {
                type: String,
                unique: true,
                required: true,
                trim: true
              },
              Username: {
                type: String,
                unique: true,
                required: true,
                trim: true
              },
              password: {
                type: String,
                required: true,
              }
        });
        User = mongoose.model('Users', UserSchema);

        return User;
    },
    createPushMessagesCollection: function() {
        // Use connect method to connect to the server

                PushMessagesSchema =   new Schema({
                    endpoint : {
                        type: String,
                        required: true
                      },
                      keys: {
                        type: Object,
                        required: true
                      },
                      date: {
                        type: String,
                        required: true,
                      }
                });
                PushMessages = mongoose.model('PushMessages', PushMessagesSchema);

                return PushMessages;
            },
    findUser(item){
        return new Promise(resolve => {
            User = (User) ? User  : mongo.createUSerCollection();
            User.findOne(item).exec(function (err, User) {
                if (err) return console.error(err);
                console.info(User);
                resolve(User);
            });
        })

    },
    insertData(endpoint='',keys=['key','value'],date='yyyy/mm/dd',state = true){
        return new Promise((resolve,reject) => {
          PushMessages = (PushMessages) ? PushMessages  : mongo.createPushMessagesCollection();

        let PushMessagesData = {
          endpoint  : endpoint,
            keys: keys,
            state: state,
            date: date
        };

        //use schema.create to insert data into the db
        PushMessages.create(PushMessagesData, function (err, ck) {
            if(err)console.error(err);
            console.dir(ck);
            resolve(ck);
        });

});
    },
    insertUSerData(email='user@domain.com',Username='username',password='Password'){
        return new Promise((resolve,reject) => {
            User = (User) ? User  : mongo.createUSerCollection();

            bcrypt.genSalt(saltRounds, function(err, salt) {
            if(err){
                console.error(err);
                reject(err);
            }
            bcrypt.hash(password, salt, function(err, hash) {
                if(err)console.error(err);
        let Userdata = {
            email  : email,
            Username: Username,
            password: hash
        };
        //user = new User(Userdata);
        //use schema.create to insert data into the db
        User.create(Userdata, function (err, usr) {
            if(err)console.error(err);
            console.dir(usr);
            resolve(usr);
        });
    });
});
});
    },
    findSubscriptionById(id){
      return new Promise((resolve,reject) => {
        PushMessages = (PushMessages) ? PushMessages  : mongo.createPushMessagesCollection();
        PushMessages.find({id:id},function (err, ws) {
              if(err)reject(err);
                  resolve(ws);
              })


      });
  },
  deleteOneSubscriptionbyId(index){
    return new Promise(resolve => {
      PushMessages = (PushMessages) ? PushMessages  : mongo.createPushMessagesCollection();

        User.findOneAndDelete({ id: index},(function (err, ws) {
            if (err) return console.error(err);
            console.dir(ws);
            resolve(ws);
        }));
    })

}
    ,
    updateById(id, obj){
        return new Promise((resolve,reject) => {
            User = (User) ? User : mongo.createUSerCollection();
            User.find({id:id},function (err, ws) {
                if(err)reject(err);
                User.update(id, obj,function (err, rs) {
                    console.log(rs);
                    resolve(rs);
                })
            })

        });
    },
    updateEmail(match,value){
        return new Promise((resolve,reject) => {
            User = (User) ? User : mongo.createUSerCollection();
            // a setter
            User.updateOne({email:match}, {email:value}, function(err,resp) {
                if(err)reject(err);
                console.log('Email update' + resp.n);
                console.log('Email update' + resp.nModified);
                resolve(resp);
            });
        });
    },
    updateUsername(match,value){
        return new Promise((resolve,reject) => {
            User = (User) ? User : mongo.createUSerCollection();
            // a setter
               User.updateOne({Username:match}, {Username:value}, function(err,resp) {
                if(err)reject(err);
                console.log('Username update' + resp.n);
                console.log('Username update' + resp.nModified);
                resolve(resp);
            });
        });
    },
    updatePasswordbyEmail(match,pass){
        return new Promise((resolve,reject) => {
            User = (User) ? User : mongo.createUSerCollection();
            bcrypt.genSalt(saltRounds, function(err, salt) {
                if(err)console.error(err);
                bcrypt.hash(pass, salt, function(err, hash) {
                    if(err)console.error(err);
               User.updateOne({email:match}, {email:match, password: hash}, function(err,resp) {
                if(err)reject(err);
                console.log('password update' + resp.n);
                console.log('password update' + resp.nModified);
                resolve(resp);
            });
        });
    });
        });
    },
    updatePasswordbyUsername(match,pass){
        return new Promise((resolve,reject) => {
            User = (User) ? User : mongo.createUSerCollection();
            bcrypt.genSalt(saltRounds, function(err, salt) {
                if(err)console.error(err);
                bcrypt.hash(pass, salt, function(err, hash) {
                    if(err)console.error(err);
               User.updateOne({Username:match}, {Username:match, password: hash}, function(err,resp) {
                if(err)reject(err);
                console.log('password update' + resp.n);
                console.log('password update' + resp.nModified);
                resolve(resp);
            });
        });
    });
        });
    },
    deleteOneUserbyPassword(index){
        return new Promise(resolve => {
            User = (User) ? User  : mongo.createUSerCollection();
            User.findOneAndDelete({email : index},(function (err, ws) {
                if (err) return console.error(err);
                console.dir(ws);
                resolve(ws);

            }));

        })

    },
    deleteOneUserbyUsername(index){
        return new Promise(resolve => {
            User = (User) ? User  : mongo.createUSerCollection();

            User.findOneAndDelete({Username : index},(function (err, ws) {
                if (err) return console.error(err);
                console.dir(ws);
                resolve(ws);
            }));
        })

    },
    deleteOneUserbyId(index){
        return new Promise(resolve => {
            User = (User) ? User  : mongo.createUSerCollection();

            User.findOneAndDelete({ id: index},(function (err, ws) {
                if (err) return console.error(err);
                console.dir(ws);
                resolve(ws);
            }));
        })

    },
    findAll(){
        return new Promise((resolve) => {
          PushMessages = (PushMessages) ? PushMessages  : mongo.createPushMessagesCollection();
            PushMessages.find({},function (err,ws) {
                let userMap = {};
                ws.forEach(function (w) {
                    userMap[w._id] = w
                });
                resolve(userMap);
            });
        });
    }
};
module.exports = mongo;
