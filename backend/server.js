import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

// routes
import IssueRoute from './routes/issue_route';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/issues_test', { useNewUrlParser: true })

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Database connection success!');
})

app.use('/issues', IssueRoute);

app.listen(4000, () => console.log('Express server on port 4000'));