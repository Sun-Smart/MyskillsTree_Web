export class botable {
    constructor(public tableid: number, public tablename: string, public status: string, public DeletedbotablemasterdetailmapIDs: string) { }
}
export interface IbotableResponse {
    total: number;
    results: botable[];
}

