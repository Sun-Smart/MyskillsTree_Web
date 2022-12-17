export class prjchangerequest {
public changeiddesc :string;public changeid :number;public reference :string;public requestdate :Date;public projectid :number;public requestor :number;public changetype :string;public changetypedesc :string;public reason :string;public priority :string;public prioritydesc :string;public products :string;public services :string;public subject :string;public details :string;public expectedresult :string;public workdetails :string;public assignto :string;public manager :number;public retrospective :boolean;public criticality :string;public criticalitydesc :string;public impact :string;public impactdesc :string;public stage :string;public stagedesc :string;public risk :string;public riskdesc :string;public impacteditems :string;public impactedservices :string;public impactedproducts :string;public estimatedduration :string;public estimatedcost :number;public actualduration :string;public actualcost :number;public verifiedby :number;public verifieddate :Date;public verifiernotes :string;public notes :string;public status :string;public DeletedprjchangerequestimpactIDs :string;
constructor() {}
}
export interface IprjchangerequestResponse {
total: number;
results: prjchangerequest[];
}

