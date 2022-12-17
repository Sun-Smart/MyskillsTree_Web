export class bolmsbranchmaster {
    public branchiddesc: string; public branchid: number; public branchcode: string; public branchname: string; public thumbnail: string; public address1: string; public address2: string; public countryid: number; public countryiddesc: string; public stateid: number; public stateiddesc: string; public cityid: number; public cityiddesc: string; public locationid: number; public locationiddesc: string; public pin: string; public latlong: string; public starttime: string; public endtime: string; public weekoff1: number; public weekoff1desc: string; public weekoff2: number; public weekoff2desc: string; public remarks: string; public totalregions: number; public accounts: number; public salespeople: number; public resourceallocation: string; public resourceallocationdesc: string; public growthopportunity: string; public growthopportunitydesc: string; public salesdirector: number; public salesdirectordesc: string; public customersuccessdirector: number; public customersuccessdirectordesc: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IbolmsbranchmasterResponse {
    total: number;
    results: bolmsbranchmaster[];
}

