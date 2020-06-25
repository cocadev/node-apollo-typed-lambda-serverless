
var fs = require('fs');
// Instantiate Couchbase and Ottoman
var couchbase=require('couchbase');
var ottoman=require('ottoman');

// Build my cluster object and open a new cluster
// var myCluster = new couchbase.Cluster('localhost:8091');
var cluster = new couchbase.Cluster('couchbase://172.31.7.208?detailed_errcodes=1');
// var cluster = new couchbase.Cluster('couchbase://127.0.0.1');
cluster.authenticate('hassan', 'password')
var myBucket = cluster.openBucket('poem_dev');
myBucket.operationTimeout=200000;
myBucket.n1qlTimeout=200000;
myBucket.on('error', function(err) {
  console.log("-------------Couchbase Error-------------")
  console.log(err);
});
ottoman.store = new ottoman.CbStoreAdapter(myBucket, couchbase);
//ottoman.bucket=myBucket;

// Build my "schema" from my model files
// require('./models/employee');
// require('./models/customer');
// require('./models/bike');

// Build the necessary indexes to function
// ottoman.ensureIndices(function(){});

ottoman.ensureIndices(function(err) {
  if (err) return console.error(err);
});


module.exports  = {bucket: myBucket, ottoman: ottoman, N1qlQuery: couchbase.N1qlQuery}
