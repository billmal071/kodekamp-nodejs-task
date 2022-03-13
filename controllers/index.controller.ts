import {
  createModel,
  deleteModel,
  getModel,
  getModelById,
  updateModel,
} from "@services/index.service";
import { errorResponse, successResponse } from "@util/responseHandler.util";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export async function getInfoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { pages, pageSize } = req.query;
    const result = await getModel(
      pages as unknown as number,
      pageSize as unknown as number
    );
    return successResponse(res, 200, result);
  } catch (err: any) {
    errorResponse(res, err.message, 500, err);
    return next(err);
  }
}

export async function getInfoByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array()[0].msg, 400);
    }
    const { id } = req.params;
    if (id === null || !id) return errorResponse(res, "id is required", 400);
    const result = await getModelById(id);
    return successResponse(res, 200, result);
  } catch (err: any) {
    errorResponse(res, err.message, 500, err);
    return next(err);
  }
}

export async function createInfoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array()[0].msg, 400);
    }
    const info = req.body;
    if (!info) return errorResponse(res, "info is required", 400);
    const result = await createModel(info);
    return successResponse(res, 201, result);
  } catch (err: any) {
    errorResponse(res, err.message, 500, err);
    return next(err);
  }
}

export async function updateInfoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array()[0].msg, 400);
    }
    const { id } = req.params;
    if (id === null || !id) return errorResponse(res, "id is required", 400);
    const info = req.body;
    if (!info) return errorResponse(res, "info is required", 400);
    const result = await updateModel(id, info);
    return successResponse(res, 200, result);
  } catch (err: any) {
    errorResponse(res, err.message, 500, err);
    return next(err);
  }
}

export async function deleteInfoController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, errors.array()[0].msg, 400);
    }
    const { id } = req.params;
    if (id === null || !id) return errorResponse(res, "id is required", 400);
    const result = await deleteModel(id);
    return successResponse(res, 200, result);
  } catch (err: any) {
    errorResponse(res, err.message, 500, err);
    return next(err);
  }
}
