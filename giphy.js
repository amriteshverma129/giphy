import HttpClient from './httpClient.js';
import View from './view.js'
import ViewPort from './viewport-observer.js'


class Giphy {
    constructor() {
        this.httpService = new HttpClient();
        this.viewService = new View();
        this.viewPortService = new ViewPort();
        this.current_total_count = 20;
        this.searchValue = '';
    }
    fetchDetail = async (searchValue) => {
        const data = await this.httpService.getSearchData(searchValue)
        this.viewService.addGifToWrapper(data);
        this.viewService.hideLoader()
        if (this.httpService.getTotalCount() > this.current_total_count) {
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
            this.searchValue = e.target.value;
            debouncingFn(e.target.value)
        })
        this.viewPortService.initObserver(this.viewService.loadMore, (e) => {
            if (e.some(el => el.isIntersecting)) {
                this.viewService.showLoader();
                this.setCurrentTotalCount();
                this.httpService.setOffset(this.httpService.getOffset() + this.httpService.getLimit());
                this.fetchDetail(this.searchValue);
            }
        })
    }
    setCurrentTotalCount() {
        this.current_total_count = this.current_total_count + this.httpService.getLimit();
    }

}

const giphy = new Giphy();
giphy.getData();



