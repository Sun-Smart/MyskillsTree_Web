export class cmsform {
    public formid: number; public formname: string; public introduction: string; public customfield: string; public attachment: string; public status: string; public DeletedcmsformpageIDs: string;
    constructor() { }
}
export interface IcmsformResponse {
    total: number;
    results: cmsform[];
}

