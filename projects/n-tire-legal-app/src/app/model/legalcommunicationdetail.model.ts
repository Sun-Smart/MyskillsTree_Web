export class legalcommunicationdetail {
public communicationiddesc :string;public communicationid :number;public partytype :number;public partytypedesc :string;public partyid :number;public partyiddesc :string;public caseid :number;public communicationdate :Date;public mode :number;public modedesc :string;public categoryid :number;public categoryiddesc :string;public documenttypeid :number;public documenttypeiddesc :string;public subject :string;public sender :string;public addressedto :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IlegalcommunicationdetailResponse {
total: number;
results: legalcommunicationdetail[];
}

