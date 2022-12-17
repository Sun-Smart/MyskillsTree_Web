export class legalinterdepartmentquery {
public caseid :number;public caseiddesc :string;public idqiddesc :string;public idqid :number;public idqdate :Date;public fromuser :number;public fromuserdesc :string;public touser :string;public subject :string;public description :string;public attachment :string;public status :string;public DeletedlegalinterdepartmentqueryresponseIDs :string;
constructor() {}
}
export interface IlegalinterdepartmentqueryResponse {
total: number;
results: legalinterdepartmentquery[];
}

