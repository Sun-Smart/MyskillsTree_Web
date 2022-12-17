export class legalinterdepartmentqueryresponse {
public idqresponseiddesc :string;public idqresponseid :number;public caseid :number;public idqid :number;public responsedate :Date;public responseby :number;public responsebydesc :string;public response :string;public attachment :string;public status :string;
constructor() {}
}
export interface IlegalinterdepartmentqueryresponseResponse {
total: number;
results: legalinterdepartmentqueryresponse[];
}

