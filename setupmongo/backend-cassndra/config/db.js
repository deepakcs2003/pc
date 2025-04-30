const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'], 
  localDataCenter: 'datacenter1',
  keyspace: ''
});

client.connect()
  .then(() => {
    console.log("Connected to Cassandra successfully!");
  })
  .catch(err => {
    console.error("Cassandra connection failed:", err);
  });

module.exports = client;
