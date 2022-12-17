export class hrmsemployeeloandetail {
public loanid :number;public detailiddesc :string;public detailid :number;public employeeid :string;public loanschemeid :number;public amount :number;public startdate :Date;public enddate :Date;public emi :number;public interestrate :number;public interest :number;public totalpayable :number;public paidtilldate :number;public remaining :number;public status :string;
constructor() {}
}
export interface IhrmsemployeeloandetailResponse {
total: number;
results: hrmsemployeeloandetail[];
}

