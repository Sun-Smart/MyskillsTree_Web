export class hrmsemployeechecklist {
public employeeid :number;public employeeiddesc :string;public employeecheckiddesc :string;public employeecheckid :number;public sourcefield :string;public sourcereference :number;public categoryid :number;public categoryiddesc :string;public subcategoryid :number;public subcategoryiddesc :string;public documentname :string;public submitdate :Date;public received :boolean;public receivedby :number;public receivedbydesc :string;public receiveddate :Date;public owner :number;public ownerdesc :string;public customfield :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeechecklistResponse {
total: number;
results: hrmsemployeechecklist[];
}

