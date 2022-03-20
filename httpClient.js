export default class HttpClient {
    constructor() {
        this.fixUrl = 'https://api.giphy.com/v1/gifs/search?'
        this.pagination = {
            limit: 20,
            total_count: Infinity,
            offset: 0,
        }
    }
    getSearchData = async (input) => {
        const res = await fetch(this.fixUrl + `q=${input}&offset=${this.pagination.offset}&limit=20&api_key=3RxA3kiBwdUQ5S2X6IzXpLJoLACjzhr1`);
        const data = await res.json();
        this.pagination.total_count = data?.pagination.total_count;
        return data
    }
    setOffset(offset) {
        this.pagination.offset = offset;
    }
    getOffset() {
        return this.pagination.offset;
    }
    setLimit(limit) {
        this.pagination.limit = limit;
    }
    getLimit() {
        return this.pagination.limit;
    }
    getTotalCount() {
        return this.pagination.total_count;
    }
}