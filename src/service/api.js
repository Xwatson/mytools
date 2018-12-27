const baseURL = 'http://xwatson.vicp.io:3001/'

export const UserApi = {
    getUser: (id) =>  baseURL + `user/${id}`
}

export const GoodsReptile = {
    getDetailById: (id) => baseURL + `api/goodsReptileConfig/get/${id}`,
    getList: baseURL + `api/goodsReptileConfig/getList`,
    update: baseURL + `api/goodsReptileConfig/update`,
    save: baseURL + `api/goodsReptileConfig/create`,
}