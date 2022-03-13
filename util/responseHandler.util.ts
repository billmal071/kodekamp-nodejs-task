import { Response } from "express";

export function responseHandler(
  res: Response,
  message: string,
  statusCode = 501,
  success = false,
  data = {}
) {
  res.status(statusCode).json({
    success,
    message,
    data: {
      message,
      data,
    },
  });
}

export const successResponse = (res: Response, statusCode = 200, data = {}) => {
  res.status(statusCode).json({ data });
};

export const errorResponse = (
  res: Response,
  message: string,
  statusCode = 500,
  error = {}
) => {
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
