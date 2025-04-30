const express = require('express');
const neo4j = require('neo4j-driver');
const cors = require('cors');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', '')
);

async function verifyConnection() {
  const session = driver.session();
  try {
    await session.run('RETURN 1');
    console.log('Connected to Neo4j database successfully');
  } catch (err) {
    console.error('Failed to connect to Neo4j:', err);
    process.exit(1); 
  } finally {
    await session.close();
  }
}

app.get('/does-cite', async (req, res) => {
  const { paperA, paperB } = req.body;
  console.log(paperA,paperB)
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH (a:Paper {paperId: $paperA}), (b:Paper {paperId: $paperB})
       OPTIONAL MATCH path = (a)-[:CITES*1..]->(b)
       RETURN CASE WHEN path IS NOT NULL THEN true ELSE false END AS cites`,
      { paperA, paperB }
    );

    const cites = result.records[0].get('cites');
    res.json({ cites });
  } catch (error) {
    console.error('Error querying Neo4j:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await session.close();
  }
});

app.get('/paper', async (req, res) => {
  const { paperId } = req.body;
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH (p:Paper {paperId: $paperId})
       RETURN p.paperId AS id, p.title AS title, p.classification AS classification`,
      { paperId }
    );

    if (result.records.length === 0) {
      return res.status(404).json({ error: 'Paper not found' });
    }

    const record = result.records[0];
    res.json({
      paperId: record.get('id'),
      title: record.get('title'),
      classification: record.get('classification')
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    await session.close();
  }
});

verifyConnection().then(() => {
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
  });
});