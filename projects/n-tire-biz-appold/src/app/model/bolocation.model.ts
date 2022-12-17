export class bolocation {
    public locationiddesc: string; public locationid: number; public branchid: number; public branchiddesc: string; public code: string; public name: string; public postalcode: string; public state: string; public stateid: string; public city: string; public cityid: number; public latitude: string; public longitude: string; public areadetails: string; public population: string; public remarks: string; public customfield: string; public status: string;
    constructor() { }
}
export interface IbolocationResponse {
    total: number;
    results: bolocation[];
}

