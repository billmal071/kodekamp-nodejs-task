import { User } from "@interfaces/common.types";
import Model from "@models/user.model";

export async function createModel(info: User) {
  const user = new Model(info);
  return user.save();
}

export async function getModel(pages: number, pageSize: number) {
  const perPage = pageSize || 10;
  const page = pages || 1;
  const skip = (page - 1) * perPage;
  const results = await Model.find().skip(skip).limit(perPage);
  const count = await Model.countDocuments();
  const totalPage = Math.ceil(count / perPage);
  const hasNextPage = page < totalPage;
  const hasPrevPage = page > 1;
  return { results, totalPage, page, perPage, hasNextPage, hasPrevPage };
}

export async function getModelById(id: string) {
  return await Model.findById(id);
}

export async function deleteModel(id: string) {
  return await Model.findByIdAndDelete(id);
}

export async function updateModel(id: string, info: User) {
  return await Model.findByIdAndUpdate(id, info);
}
