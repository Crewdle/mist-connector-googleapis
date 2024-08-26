import { ISearchConnector, ISearchConnectorResult } from '@crewdle/web-sdk-types';
export declare class GoogleSearchConnector implements ISearchConnector {
    search(query: string, apiKey: string, searchEngineId: string): Promise<ISearchConnectorResult[]>;
}
