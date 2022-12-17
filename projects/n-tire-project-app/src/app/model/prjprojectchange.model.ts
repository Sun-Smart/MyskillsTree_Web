export class prjprojectchange {
public projectid :number;public changeiddesc :string;public changeid :number;public changerequestid :number;public changedetails :string;public changedate :Date;public requestedby :number;public assignto :string;public verifiedby :number;public changestatus :string;public changestatusdesc :string;public remarks :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IprjprojectchangeResponse {
total: number;
results: prjprojectchange[];
}

