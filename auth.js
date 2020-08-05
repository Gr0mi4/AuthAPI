let express = require('express');
let app = express();
// let fs = require('fs');
const DB = require('./createDB')


app.use(function (req, res) {
  let users;
  let result;
  // function getUsersFromDB() {
  //   return new Promise((resolve, reject) => {
  //   })
  // }
  // getUsersFromDB()
  //    .then((data) => console.log(data))
  //    .catch(err => console.log(err))

  if (req.headers.authorization) {
    function getUsers() {
      return new Promise((resolve, reject) => {
        result = DB.getResults()
           .then(data => {
             users = data[0].users
             resolve(users)
           })
           .catch(err => console.log(err))
        // fs.readFile('users.json', (err, fd) => {
        //   if (err) {
        //     console.log(err)
        //   } else {
        //     users = JSON.parse(fd.toString())
        //     resolve(users)
        //   }
        // })
      })
    }

    getUsers()
       .then((users) => {
         console.log(users)
         let authData = Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString('ascii')
         let username = authData.match(/.+?(?=:)/i)[0]
         let password = authData.match(/(?<=:).*/i)[0]
         result = users.find((item) => {
           if (item.username === username && item.password === password) {
             return item
           }
         })
       })
       .then(() => {
         result ? res.send('User successfully authenticated') : res.status(401).send('Bad Credentials')
       })
  } else {
    res.send('Hello! this is authorization API. Please send your credentials to check your authorization')
  }
})

app.listen(1337, function () {
  console.log('Express server listening on port 1337');
});
