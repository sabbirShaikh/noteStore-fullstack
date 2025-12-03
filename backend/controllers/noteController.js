import NOTE from "../models/noteModel.js";

// SEND ALL NOTES (pinned first)
async function sendNotes(req, res) {
  try {
    const userId = req.userId.userId;

    const notes = await NOTE.find({ userId }).sort({
      isPinned: -1,
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Notes fetched",
      notes,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// ADD NOTES
async function addNotes(req, res) {
  try {
    const userId = req.userId.userId;
    const { title, content, category, priority, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Provide all the required fields.",
      });
    }

    await NOTE.create({
      userId,
      title,
      content,
      category: category || "",
      priority: priority || "",
      isPinned: !!isPinned,
    });

    return res.status(200).json({
      success: true,
      message: "Note added!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// DELETE NOTE
async function deleteNotes(req, res) {
  try {
    const noteId = req.params.id;

    await NOTE.findByIdAndDelete(noteId);

    return res.status(200).json({
      success: true,
      message: "Note deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// COMPLETE / INCOMPLETE TOGGLE
async function completeNote(req, res) {
  try {
    const noteId = req.params.id;

    const findNote = await NOTE.findById(noteId);
    if (!findNote) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    const newStatus = !findNote.isCompleted;

    await NOTE.findByIdAndUpdate(noteId, {
      $set: { isCompleted: newStatus },
    });

    return res.status(200).json({
      success: true,
      message: newStatus ? "completed" : "incompleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

// UPDATE NOTES (title, content, category, priority, pin)
async function updateNote(req, res) {
  try {
    const noteId = req.params.id;
    const { title, content, category, priority, isPinned } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Provide all required fields.",
      });
    }

    await NOTE.findByIdAndUpdate(noteId, {
      $set: {
        title,
        content,
        category: category || "",
        priority: priority || "",
        isPinned: !!isPinned,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Note updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export { sendNotes, addNotes, deleteNotes, completeNote, updateNote };
