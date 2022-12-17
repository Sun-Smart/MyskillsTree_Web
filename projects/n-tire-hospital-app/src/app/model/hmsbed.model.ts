export class hmsbed {
    public bedid: number; public wardid: number; public bedname: string; public bedtype: string; public bedtypedesc: string; public imageurl: string; public roomlength: number; public roomwidth: number; public facilities: string; public remarks: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IhmsbedResponse {
    total: number;
    results: hmsbed[];
}

