export default class HttpClient {
    constructor() {
        this.fixUrl = 'https://api.giphy.com/v1/gifs/search?'
        this.pagination = {
            offset: 0,
            limit: 20,
            total_count: Infinity
        }
    }
    getSearchData = async (input, offset = 0, limit = 20) => {
        const res = await fetch(this.fixUrl + `q=${input}&offset=${offset}&limit=${limit}&api_key=3RxA3kiBwdUQ5S2X6IzXpLJoLACjzhr1`);
        const data = await res.json();
        this.pagination.total_count = data?.pagination.total_count;
        return data
    }
}