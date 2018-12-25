import { request } from '../utils/http';
import { GoodsReptile } from "./api";

export const Save = async(q = {}) => {
    try {
        return await request(GoodsReptile.save, 'POST', q);
    } catch (error) {
        return null;
    }
}