import NOTE from "../models/noteModel.js";

//send notes
async function sendNotes(req, res) {
  try {
    const { userId } = req.userId;
    const notes = await NOTE.find({ userId });
    return res.status(200).json({ success: true, message: "note sends", notes })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: "server side error" })
  }
}

//add notes
async function addNotes(req, res) {
  try {
    const { title, content } = req.body;
    const { userId } = req.userId;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "provide all the fields." })
    }
    await NOTE.insertOne({ userId, title, content, isCompleted: false });
    return res.status(200).json({ success: true, message: "note added!" })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ success: false, message: "server side error" })
  }
}

//delete notes
async function deleteNotes(req, res) {
  try {
    const noteId = req.params.id;
    await NOTE.findByIdAndDelete({ _id: noteId });
    return res.status(200).json({ success: true, message: "note deleted!" })
  } catch (error) {
    return res.status(500).json({ success: false, message: "server side error" })
  }
}

//complete notes
async function completeNote(req, res) {
  try {
    const noteId = req.params.id;
    const findNote = await NOTE.findById({ _id: noteId });
    await NOTE.findByIdAndUpdate({ _id: noteId }, { $set: { isCompleted: !findNote.isCompleted } })
    return res.status(200).json({ success: true, message: findNote.isCompleted ? "incompleted" : "completed" })
  } catch (error) {
    return res.status(500).json({ success: false, message: "server side error" })
  }
}

//update notes
async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "provide all the fields." })
    }
    await NOTE.findByIdAndUpdate({ _id: noteId }, { $set: { title, content } })
    return res.status(200).json({ success: true, message: "note updated successfully." })
  } catch (error) {
    return res.status(500).json({ success: false, message: "server side error" })
  }
}

export { sendNotes, addNotes, deleteNotes, completeNote, updateNote }