export class hrmsparesponse {
public appraisalfeedbackiddesc :string;public appraisalfeedbackid :number;public paid :number;public employeeid :number;public appraisaluser :number;public qmid :number;public answer :string;public rating :number;public status :string;
constructor() {}
}
export interface IhrmsparesponseResponse {
total: number;
results: hrmsparesponse[];
}

