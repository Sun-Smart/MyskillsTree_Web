export class hrmstamssetting {
public tamsiddesc :string;public tamsid :number;public branchid :number;public branchiddesc :string;public yearstart :string;public yearstartdesc :string;public yearend :string;public yearenddesc :string;public exitreader :boolean;public entrybiometric :string;public exitbiometric :string;public halfdayhours :string;public fulldayhours :string;public starttime :string;public endtime :string;public lunchfrom :string;public lunchto :string;public gracein :string;public graceout :string;public permissiblelateinmonth :number;public permissionduration :string;public permissionbyapproval :number;public latelogic :string;public latelogicdesc :string;public latecostpermin :number;public lateexitwaiver :boolean;public numberofpermissions :number;public otduringworkingdays :number;public otduringholidays :number;public otbyapproval :boolean;public status :string;
constructor() {}
}
export interface IhrmstamssettingResponse {
total: number;
results: hrmstamssetting[];
}

