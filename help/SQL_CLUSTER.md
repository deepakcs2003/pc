Sure! Here's the content in Markdown (`.md`) format exactly as you requested, without any changes:

```markdown
# MySQL Cluster Setup on a Single Windows Machine

This document provides step-by-step instructions on setting up MySQL Cluster on a single Windows machine, including starting the management node, data nodes, and SQL node.

## 1. Install MySQL Cluster

Download the MySQL Cluster Community Edition from the official MySQL site and extract it to:  
`C:\mysql-cluster`

## 2. Create the Configuration File

Inside your MySQL Cluster root folder, create a file:  
`C:\mysql-cluster\config.ini`  
**config.ini content:**

```
[ndb_mgmd]
hostname=localhost
datadir=C:/mysql-cluster/mgm

[ndbd default]
noofreplicas=1
datadir=.

[ndbd]
hostname=localhost
datadir=C:/mysql-cluster/data-node1
NodeId=2

[ndbd]
hostname=localhost
datadir=C:/mysql-cluster/data-node2
NodeId=3

[ndbd]
hostname=localhost
datadir=C:/mysql-cluster/data-node3
NodeId=4

[mysqld]
hostname=localhost
```

## 3. Start the Management Node

Open CMD and execute the following command:

```bash
cd C:\mysql-cluster\bin
ndb_mgmd -f C:\mysql-cluster\config.ini --configdir=C:\mysql-cluster
```

## 4. Start Data Nodes

Open separate CMD windows (or sequentially) for each data node:

- Node 1: `ndbd --ndb-nodeid=2`  
- Node 2: `ndbd --ndb-nodeid=3`  
- Node 3 (Optional): `ndbd --ndb-nodeid=4`

## 5. Initialize MySQL Server Data Directory

Execute the following command to initialize the MySQL data directory:

```bash
cd C:\mysql-cluster\bin
mysqld --initialize-insecure --basedir=C:\mysql-cluster --datadir=C:\mysql-cluster\mysql_data
```

## 6. Start SQL Server (mysqld)

Execute the following command to start the SQL server:

```bash
cd C:\mysql-cluster\bin
mysqld --ndbcluster --basedir=C:\mysql-cluster --datadir=C:\mysql-cluster\mysql_data --port=3307 --console
```

## 7. Connect MySQL Client to the Server

In a new terminal, execute the following to connect to MySQL:

```bash
cd C:\mysql-cluster\bin
mysql -u root -P 3307
```

## 8. Access Cluster Management Console

Execute the following to access the management console:

```bash
cd C:\mysql-cluster\bin
ndb_mgm
```

In the management console, use the command:

```
ndb_mgm> show
```

### Sample Output:

```
Connected to Management Server at: localhost:1186
Cluster Configuration
---------------------
[ndbd(NDB)]     2 node(s)
id=2    @127.0.0.1  (mysql-8.0.41 ndb-8.0.41, Nodegroup: 0, *)
id=3    @127.0.0.1  (mysql-8.0.41 ndb-8.0.41, Nodegroup: 0)

[ndb_mgmd(MGM)] 1 node(s)
id=1    @127.0.0.1  (mysql-8.0.41 ndb-8.0.41)

[mysqld(API)]   1 node(s)
id=4    @127.0.0.1  (mysql-8.0.41 ndb-8.0.41)
```

## Summary

The steps to set up MySQL Cluster on a single Windows machine are as follows:

| Step | Component                     | Description                      |
|------|-------------------------------|----------------------------------|
| 1    | MySQL Cluster                 | Download and extract             |
| 2    | `config.ini`                  | Define cluster structure         |
| 3    | `ndb_mgmd`                    | Start management node            |
| 4    | `ndbd`                        | Start data nodes                 |
| 5    | `mysqld --initialize-insecure`| Prepare MySQL data directory     |
| 6    | `mysqld`                      | Start SQL server (port 3307)     |
| 7    | `mysql`                       | Connect to MySQL                 |
| 8    | `ndb_mgm`                     | Check cluster status             |
```

Would you like me to save this as a downloadable `.md` file for you?