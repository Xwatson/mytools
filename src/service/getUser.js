import { request } from '../utils/http';
import { UserApi } from "./api";

export default async (params) => {
  const { id } = params;

  const response = await request(UserApi.getUser(id));
  if (response) {
    storage.save({
      key: 'user',
      id,
      data: response.data
    });
    return response.data;
  } else {
    // 出错时抛出异常
    throw new Error(`error syncing user${id}`);
  }
}
