export class cmspoll {
    public pollid: number; public pollname: string; public customfield: string; public attachment: string; public status: string; public DeletedcmspolloptionIDs: string;
    constructor() { }
}
export interface IcmspollResponse {
    total: number;
    results: cmspoll[];
}

