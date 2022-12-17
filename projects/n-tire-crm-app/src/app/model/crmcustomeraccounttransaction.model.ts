export class crmcustomeraccounttransaction {
public transactioniddesc :string;public transactionid :number;public accountid :number;public accountiddesc :string;public customerid :number;public customeriddesc :string;public cifnumber :string;public accountnumber :string;public date :Date;public description :string;public amount :string;public transactiontype :string;public transactiontypedesc :string;public closingbalance :string;public customfield :string;public status :string;
constructor() {}
}
export interface IcrmcustomeraccounttransactionResponse {
total: number;
results: crmcustomeraccounttransaction[];
}

