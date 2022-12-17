export class hrmsemployeeleaveledger {
public ledgeriddesc :string;public ledgerid :number;public ledgerdate :Date;public employeeid :number;public leavetypeid :string;public description :string;public credit :number;public debit :number;public balance :number;public status :string;
constructor() {}
}
export interface IhrmsemployeeleaveledgerResponse {
total: number;
results: hrmsemployeeleaveledger[];
}

