export class hrmsemployeeeosdetail {
public employeeeosiddesc :string;public employeeeosid :number;public employeeid :number;public eosid :number;public eosiddesc :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeeosdetailResponse {
total: number;
results: hrmsemployeeeosdetail[];
}

