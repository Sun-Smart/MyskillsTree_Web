export class legalcourtprocessmaster {
public processiddesc :string;public processid :number;public casetype :number;public casetypedesc :string;public processcode :string;public processname :string;public estimatedtime :string;public processdetails :string;public actiontobetaken :string;public status :string;
constructor() {}
}
export interface IlegalcourtprocessmasterResponse {
total: number;
results: legalcourtprocessmaster[];
}

