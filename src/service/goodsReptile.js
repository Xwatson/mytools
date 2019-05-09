import { httpPost, httpGet } from '../utils/http';
import { GoodsReptile } from "./api";

export const getDetailById = async (id) => {
  return await httpGet(GoodsReptile.getDetailById(id));
}

export const Save = async (q = {}) => {
  return await httpPost(GoodsReptile.save, q);
}

export const Update = async (q = {}) => {
  return await httpPost(GoodsReptile.update, q);
}

export const getList = async (q = {}) => {
  return await httpGet(GoodsReptile.getList, q);
}
