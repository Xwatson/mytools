import { observable, action, runInAction } from "mobx";
import { fetchHotGameList } from "../service/getGames";

class HomeStore {
  @observable fetching = false;
  @observable hotGameList; // 热门游戏列表
  @observable error;
  constructor() {
  }

  @action
  fetchHotList = async({ page, size }) => {
    this.fetching = true;
    try {
      const res = await fetchHotGameList({ page, size });
      if (res.code === 0) {
        runInAction(() => {
          this.fetching = false;
          this.hotGameList = res.data;
        });
      }
    } catch (error) {
      this.error = error;
    }
  }
}

export default new HomeStore();
