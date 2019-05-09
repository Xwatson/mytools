import { httpPost, httpGet } from '../utils/http';
import { GoodsReptile } from "./api";

export const fetchHotGameList = async (q = {}) => {
  // return await httpGet(GoodsReptile.getList, q);
  return new Promise((resolve, reject) => {
    const data = {
      id: 1,
      imageUrl: 'https://avatars0.githubusercontent.com/u/13580629?s=460&v=4',
      title: '超变传奇',
      category: {
        id: 1,
        name: '角色'
      },
      typeName: '传奇',
      subTitles: [
        {
          id: 1,
          name: '官方变态服',
          bgColor: '#fff',
          color: 'greenyellow'
        },
        {
          id: 2,
          name: '官方变态服',
          bgColor: '#fff',
          color: 'blue'
        }
      ]
    };
    setTimeout(() => {
      const row = [1, 2, 3, 4, 5, 6, 7, 8].map(id => {
        data.id = id;
        data.category.id = id;
        return data;
      })
      resolve({ code: 0, data: { count: 8, row } })
    }, 2000);
  });
}
