import express from 'express';
import authentication from '../auth/authentication.js';
import { addNotes, completeNote, deleteNotes, sendNotes, updateNote } from '../controllers/noteController.js';

const notesRouter = express.Router()

notesRouter.get("/", authentication, sendNotes);
notesRouter.post("/", authentication, addNotes);
notesRouter.put("/:id", authentication, completeNote);
notesRouter.delete("/:id", authentication, deleteNotes);
notesRouter.put("/update/:id", authentication, updateNote);

export default notesRouter