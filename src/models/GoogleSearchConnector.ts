import { ISearchConnector, ISearchConnectorResult } from '@crewdle/web-sdk-types';

export class GoogleSearchConnector implements ISearchConnector {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async search(query: string, searchEngineId: string): Promise<ISearchConnectorResult[]> {
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

    let searchResults: ISearchConnectorResult[] = [];
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