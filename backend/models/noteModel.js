import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // NEW FIELD: Category
    category: {
      type: String,
      default: "",
      enum: ["Work", "Study", "Personal", "Ideas", "Important", "Other", ""],
    },

    // NEW FIELD: Priority (Low, Medium, High)
    priority: {
      type: String,
      default: "",
      enum: ["High", "Medium", "Low", ""],
    },

    // NEW FIELD: Pinned Notes
    isPinned: {
      type: Boolean,
      default: false,
    },

    // Already had this
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const NOTE = mongoose.model("Note", noteSchema);

export default NOTE;
