import validator from "validator";
import TileModel from "../model/Tile.js";

export const createTile = async (req, res) => {

    const { label, icon, color, category } = req.body;
  const userId = req.userId;

  try {

    // Validate fields
    if (!label || !icon || !color || !category) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${[!label && "label", !icon && "icon", !color && "color", !category && "category"].filter(Boolean).join(", ")}`,
      });
    }

    // if (label.length > 20) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Label cannot exceed 20 characters",
    //   });
    // }

    if (!validator.isHexColor(color)) {
      return res.status(400).json({
        success: false,
        message: "Color must be a valid hex code (e.g., #26A69A)",
      });
    }

    // Check for duplicate label for this user
    // const existingTile = await TileModel.findOne({ userId, label });
    // if (existingTile) {
    //   return res.status(400).json({
    //     success: false,
    //     message: `Tile with label "${label}" already exists for this user`,
    //   });
    // }

    const tile = await TileModel.create({
      userId,
      label,
      icon,
      color,
      category,
    });
    

    res.status(201).json({
      success: true,
      message: "Tile created successfully",
      tile,
    });

  } catch (error) {
    console.error("Error creating tile:", error);
    res.status(500).json({
      success: false,
      message: `Failed to create tile: ${error.message}`,
    });
  }

}

export const getTiles = async (req, res) => {
  const userId = req.userId;
  const { category, page = 1, limit = 20 } = req.query;

  try {
    const query = {
      $or: [{ userId }, { userId: null }], // User-specific or default tiles
    };
    if (category) query.category = category;

    const tiles = await TileModel.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    const total = await TileModel.countDocuments(query);

    res.status(200).json({
      success: true,
      message: "Tiles retrieved successfully",
      tiles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching tiles:", error);
    res.status(500).json({
      success: false,
      message: `Failed to fetch tiles: ${error.message}`,
    });
  }
};

export const getTile = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const tile = await TileModel.findOne({
      _id: id,
      $or: [{ userId }, { userId: null }],
    });

    if (!tile) {
      return res.status(404).json({
        success: false,
        message: "Tile not found or you don’t have access",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tile retrieved successfully",
      tile,
    });
  } catch (error) {
    console.error("Error fetching tile:", error);
    res.status(500).json({
      success: false,
      message: `Failed to fetch tile: ${error.message}`,
    });
  }
};

export const updateTile = async (req, res) => {
  const { id } = req.params;
  const { label, icon, color, category } = req.body;
  const userId = req.userId;

  try {
    // Validate fields
    if (!label || !icon || !color || !category) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${[!label && "label", !icon && "icon", !color && "color", !category && "category"].filter(Boolean).join(", ")}`,
      });
    }

    // if (label.length > 20) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Label cannot exceed 20 characters",
    //   });
    // }

    if (!validator.isHexColor(color)) {
      return res.status(400).json({
        success: false,
        message: "Color must be a valid hex code (e.g., #26A69A)",
      });
    }

    const tile = await TileModel.findOne({ _id: id, userId });
    if (!tile) {
      return res.status(404).json({
        success: false,
        message: "Tile not found or you don’t have permission to update it",
      });
    }

    // Check for duplicate label
    // const existingTile = await TileModel.findOne({
    //   userId,
    //   label,
    //   _id: { $ne: id },
    // });
    // if (existingTile) {
    //   return res.status(400).json({
    //     success: false,
    //     message: `Tile with label "${label}" already exists for this user`,
    //   });
    // }

    tile.label = label;
    tile.icon = icon;
    tile.color = color;
    tile.category = category;
    await tile.save();

    res.status(200).json({
      success: true,
      message: "Tile updated successfully",
      tile,
    });
  } catch (error) {
    console.error("Error updating tile:", error);
    res.status(500).json({
      success: false,
      message: `Failed to update tile: ${error.message}`,
    });
  }
};

export const deleteTile = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const tile = await TileModel.findOneAndDelete({ _id: id, userId });
    if (!tile) {
      return res.status(404).json({
        success: false,
        message: "Tile not found or you don’t have permission to delete it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tile deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tile:", error);
    res.status(500).json({
      success: false,
      message: `Failed to delete tile: ${error.message}`,
    });
  }
};

export const bulkDeleteTiles = async (req, res) => {
  const { tileIds } = req.body;
  const userId = req.userId;

  try {
    if (!Array.isArray(tileIds) || tileIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "tileIds must be a non-empty array",
      });
    }

    const result = await TileModel.deleteMany({
      _id: { $in: tileIds },
      userId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No tiles found or you don’t have permission to delete them",
      });
    }

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} tile(s) deleted successfully`,
    });
  } catch (error) {
    console.error("Error bulk deleting tiles:", error);
    res.status(500).json({
      success: false,
      message: `Failed to bulk delete tiles: ${error.message}`,
    });
  }
};