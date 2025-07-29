// routes/tileRoutes.js
import express from "express";
import {
  createTile,
  getTiles,
  getTile,
  updateTile,
  deleteTile,
  bulkDeleteTiles,
} from "../controllers/tileController.js";
import verifyToken from "../middleware/verifyToken.js";

const tileRouter = express.Router();

// tileRouter.use(verifyToken); 

tileRouter.post("/", verifyToken,createTile);
tileRouter.get("/", verifyToken, getTiles);
tileRouter.get("/:id", verifyToken, getTile);
tileRouter.put("/:id", verifyToken, updateTile);
tileRouter.delete("/:id", verifyToken, deleteTile);
tileRouter.delete("/", verifyToken, bulkDeleteTiles);

export default tileRouter;