export class erpcontractorderterm {
public contracttermiddesc :string;public contracttermid :number;public contractid :number;public contractiddesc :string;public terms :string;public notes :string;public targetdate :Date;public actualdate :Date;public rating :string;public ratingdesc :string;public status :string;
constructor() {}
}
export interface IerpcontractordertermResponse {
total: number;
results: erpcontractorderterm[];
}

