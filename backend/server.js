import express from 'express';
import cors from 'cors'
import notesRouter from './routes/notesRouter.js';
import dbConnection from './db/dbConnection.js';
import userRouter from './routes/userRouter.js';

const app = express();
//database connection
dbConnection()

//frontend connection
app.use(cors())

app.use(express.json());

//user routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/notes", notesRouter)


app.listen(8000, () => {
  console.log("server started at: http://localhost:8000")
})