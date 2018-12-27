import { observable, autorun, action, runInAction } from "mobx";
import { getList } from "../service/goodsReptile";

export default class GoodsReptileStore {
    @observable fetching = false;
    @observable list = {};
    @observable error;

    @action
    getList = async(page = 1, size = 20) => {
        this.fetching = true;
        try {
            const res = await getList({ page, size });
            if (res.data.code === 0) {
                runInAction(() => {
                    this.fetching = false;
                    this.list = res.data.data;
                });
            }
        } catch (error) {
            this.error = error;
        }
    }
}
