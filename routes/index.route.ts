import {
  createInfoController,
  deleteInfoController,
  getInfoByIdController,
  getInfoController,
  updateInfoController,
} from "@controllers/index.controller";
import express from "express";
import { check } from "express-validator";
const router = express.Router();

// get
router.get("/info", getInfoController);

// get by id
router.get(
  "/info/:id",
  [
    check("id")
      .notEmpty()
      .withMessage("id can't be empty")
      .isMongoId()
      .withMessage("id must be a valid mongo id"),
  ],
  getInfoByIdController
);

// post
router.post(
  "/info",
  [
    check("name")
      .isLength({ min: 2, max: 25 })
      .withMessage("Name can't be less than 2 chars")
      .isString()
      .withMessage("Name must be a string")
      .notEmpty()
      .withMessage("Name is required"),
    check("age")
      .isNumeric()
      .withMessage("Age must be a number")
      .notEmpty()
      .withMessage("Age is required"),
    check("message")
      .isLength({ min: 2, max: 300 })
      .withMessage("Name can't be less than 2 chars")
      .notEmpty()
      .withMessage("Message is required"),
  ],
  createInfoController
);

// update
router.put(
  "/info/:id",
  [
    check("id")
      .notEmpty()
      .withMessage("id can't be empty")
      .isMongoId()
      .withMessage("id must be a valid mongo id"),
    check("name")
      .isLength({ min: 2, max: 25 })
      .withMessage("Name can't be less than 2 chars")
      .isString()
      .withMessage("Name must be a string")
      .notEmpty()
      .withMessage("Name is required"),
    check("age")
      .isNumeric()
      .withMessage("Age must be a number")
      .notEmpty()
      .withMessage("Age is required"),
    check("message")
      .isLength({ min: 2, max: 300 })
      .withMessage("Name can't be less than 2 chars")
      .notEmpty()
      .withMessage("Message is required"),
  ],
  updateInfoController
);

// patch message
router.patch(
  "/info/:id",
  [
    check("id")
      .notEmpty()
      .withMessage("id can't be empty")
      .isMongoId()
      .withMessage("id must be a valid mongo id"),
    check("message")
      .isLength({ min: 2, max: 300 })
      .withMessage("Message can't be less than 2 chars")
      .notEmpty()
      .withMessage("Message is required"),
  ],
  updateInfoController
);

// delete
router.delete(
  "/info/:id",
  [
    check("id")
      .notEmpty()
      .withMessage("id can't be empty")
      .isMongoId()
      .withMessage("id must be a valid mongo id"),
  ],
  deleteInfoController
);

export default router;
