export class prjrelease {
public releaseiddesc :string;public releaseid :number;public projectid :number;public requestor :number;public category :string;public categorydesc :string;public type :string;public typedesc :string;public releaseby :number;public audience :string;public priority :string;public prioritydesc :string;public criticality :string;public criticalitydesc :string;public impact :string;public impactdesc :string;public risk :string;public riskdesc :string;public impacteditems :string;public impactedservices :string;public impactedproducts :string;public estimatedstartdate :Date;public estimatedenddate :Date;public actualstartdate :Date;public actualenddate :Date;public title :string;public description :string;public releasestatus :string;public releasestatusdesc :string;public notes :string;public status :string;public DeletedprjreleaseteamresponseIDs :string;
constructor() {}
}
export interface IprjreleaseResponse {
total: number;
results: prjrelease[];
}

