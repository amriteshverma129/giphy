import HttpClient from './httpClient.js';
import View from './view.js'


class Giphy {
    constructor() {
        this.httpService = new HttpClient();
        this.viewService = new View();
    }
    fetchDetail = async (searchValue) => {
        const data = await this.httpService.getSearchData(searchValue)
        this.viewService.addGifToWrapper(data);
        this.viewService.hideLoader()
        if (this.httpService.pagination.total_count > current_total_count) {
            this.viewService.showLoadMoreBtn();
        }
        else {
            this.viewService.hideLoadMoreBtn();
        }
    }

    debouncing = (callback, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback.apply(this, args);
                this.viewService.showLoader();
            }, delay);
        }
    }

    getData = () => {
        this.viewService.hideLoader();
        this.viewService.hideLoadMoreBtn();
        const debouncingFn = this.debouncing(this.fetchDetail, 1000);
        document.querySelector('.search').addEventListener('keyup', (e) => {
            debouncingFn(e.target.value)
        })
    }
}

const giphy = new Giphy();
giphy.getData();



