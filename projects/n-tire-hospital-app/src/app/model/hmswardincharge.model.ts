export class hmswardincharge {
    public wardinchargeid: number; public wardid: number; public incharge: number; public inchargedesc: string; public starttime: string; public endtime: string; public status: string;
    constructor() { }
}
export interface IhmswardinchargeResponse {
    total: number;
    results: hmswardincharge[];
}

