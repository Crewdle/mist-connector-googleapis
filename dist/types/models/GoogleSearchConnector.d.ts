import { ISearchConnector, ISearchConnectorResult } from '@crewdle/web-sdk-types';
export declare class GoogleSearchConnector implements ISearchConnector {
    private apiKey;
    constructor(apiKey: string);
    search(query: string, searchEngineId: string): Promise<ISearchConnectorResult[]>;
}
