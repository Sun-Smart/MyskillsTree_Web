export class cmspolloption {
    public polloptionid: number; public pollid: number; public polloption: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IcmspolloptionResponse {
    total: number;
    results: cmspolloption[];
}

