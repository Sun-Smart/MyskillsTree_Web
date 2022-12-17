export class cmsformpage {
    public formid: number; public pageid: number; public pagename: string; public customfield: string; public attachment: string; public status: string; public DeletedcmspagequestionIDs: string;
    constructor() { }
}
export interface IcmsformpageResponse {
    total: number;
    results: cmsformpage[];
}

