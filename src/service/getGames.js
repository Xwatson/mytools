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
          bgColor: '#62BFF2',
          color: '#fff'
        },
        {
          id: 2,
          name: '送VIP16',
          bgColor: '#FEAF24',
          color: '#fff'
        },
        {
          id: 3,
          name: '送VIP16',
          bgColor: '#FB8486',
          color: '#fff'
        },
        {
          id: 4,
          name: '送VIP16',
          bgColor: 'blue',
          color: '#fff'
        },
        {
          id: 5,
          name: '送VIP16',
          bgColor: 'blue',
          color: '#fff'
        },
        {
          id: 6,
          name: '送VIP16',
          bgColor: 'blue',
          color: '#fff'
        },
        {
          id: 7,
          name: '送VIP16',
          bgColor: 'blue',
          color: '#fff'
        },
        {
          id: 12,
          name: '送VIP16',
          bgColor: 'blue',
          color: '#fff'
        },
        {
          id: 13,
          name: '送VIP16',
          bgColor: 'blue',
          color: '#fff'
        },
        {
          id: 14,
          name: '送VIP16',
          bgColor: 'blue',
          color: '#fff'
        }
      ]
    };
    setTimeout(() => {
      const row = [1, 2, 3, 4, 5, 6, 7, 8].map(id => {
        return { ...data, id: id + parseInt(Math.random() * 1000).toString(), title: data.title + id  };
      });
      resolve({ code: 0, data: { count: 8, row } })
    }, 2000);
  });
}
