const MongoClient = require('mongodb').MongoClient;
const format = require('util').format;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
exports.getResults = function () {
  return new Promise((resolve, reject) => {
    let results;
    MongoClient.connect(url, function (err, client) {
      const db = client.db(dbName);
      assert.equal(null, err);
      console.log("Connected successfully to server");
      let collection = db.collection('test_insert');
      collection.find().toArray(function (err, res) {
        // console.log(res)
        results = res
        // console.log('results=' + results)
        resolve(results)
      })
    })
  })
}
    // collection.insertOne({users:{
    //   ivan: '12345678',
    //   vasya: '87654321',
    //   petya: '102'
    //   }}, function (err, docs) {
    //   console.log(docs.ops)
    //   collection.count(function (err, count) {
    //     console.log(format("count = %s", count))
    //   })
    //
    //   collection.find().toArray(function (err, res) {
    //     console.dir(res)
    //     // db.close
    //   })
    // })

    // client.close();
  // })
// };
