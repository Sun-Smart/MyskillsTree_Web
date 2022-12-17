export class hrmsemployeeexitquestiondetail {
public exitquestiondetailiddesc :string;public exitquestiondetailid :number;public resignationid :number;public exitquestionid :number;public exitquestiontype :string;public question :string;public answer :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeexitquestiondetailResponse {
total: number;
results: hrmsemployeeexitquestiondetail[];
}

