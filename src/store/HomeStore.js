import { observable, action } from "mobx";

class HomeStore {
    @observable text; // 监听属性
    @observable num;
    constructor() {
        this.text = '你是，我是首页！';
        this.num = 0;
    }

    @action
    plus = () => {
        this.num += 1;
    }
    @action
    minus = () => {
        this.num -= 1;
    }
}

export default new HomeStore();