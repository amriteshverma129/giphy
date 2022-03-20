export default class View {
    constructor() {
        this.wrapper = document.querySelector('.result-wrapper');
        this.search = document.querySelector('.search');
        this.loadMore = document.querySelector('.load-more-btn');
        this.loader = document.querySelector('.loader');
    }
    addGifToWrapper = (data) => {
        data.data.forEach((item) => {
            this.wrapper.innerHTML += `<div><img  class="imageStyle" src=${item.images.original.url} alt=${item.alt} tilte=${item.alt}/></div>`
        })

    }
    getSearchInput = () => {
        const value = this.search.value;
        return value
    }
    showLoadMoreBtn = () => {
        this.loadMore.classList.remove('hidden')
    }
    hideLoadMoreBtn = () => {
        this.loadMore.classList.add('hidden')
    }
    showLoader = () => {
        this.loader.classList.remove('hidden')
    }
    hideLoader = () => {
        this.loader.classList.add('hidden')
    }
}