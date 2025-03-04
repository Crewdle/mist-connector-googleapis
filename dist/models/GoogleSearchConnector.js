export class GoogleSearchConnector {
    apiKey;
    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    async search(query, searchEngineId) {
        const { google } = await import('googleapis');
        const customsearch = google.customsearch('v1');
        const res = await customsearch.cse.list({
            cx: searchEngineId,
            q: query,
            auth: this.apiKey,
        });
        if (!res.data.items) {
            throw new Error('No search results');
        }
        let searchResults = [];
        for (const item of res.data.items) {
            searchResults.push({
                title: item.title ?? '',
                snippet: item.snippet ?? '',
                url: item.link ?? '',
            });
        }
        return searchResults;
    }
}
