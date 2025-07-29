// models/Tile.js
import mongoose from "mongoose";

const TileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null, // null for default/global tiles
    },
    label: {
      type: String,
      required: [true, "Label is required"],
      trim: true,
      maxlength: [20, "Label cannot exceed 20 characters"],
    },
    icon: {
      type: String,
      required: [true, "Icon is required"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Color is required"],
      match: [/^#[0-9A-Fa-f]{6}$/, "Color must be a valid hex code"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const TileModel = mongoose.models.tile || mongoose.model("tile", TileSchema);

export default TileModel;