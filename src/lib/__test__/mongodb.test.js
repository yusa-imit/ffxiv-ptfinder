const { MongoClient } = require('mongodb');
const uri = "mongodb://admin:Tl1qkfsusdk!@sutora.org:27017"
const client = new MongoClient(uri);
try {
  client.connect().then((v) => {
    console.log('connected')
    console.log(v);
    client.db('ishgard').createCollection('test').then(() => {
      console.log('create collection test');
    })
  });
}
catch (e) {
  console.log('failure');
  console.log(e)
}