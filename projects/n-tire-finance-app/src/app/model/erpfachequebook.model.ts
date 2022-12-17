export class erpfachequebook {
public txniddesc :string;public txnid :number;public bankid :number;public bankiddesc :string;public txndate :Date;public chequefrom :number;public chequeto :number;public totalleaves :number;public status :string;
constructor() {}
}
export interface IerpfachequebookResponse {
total: number;
results: erpfachequebook[];
}

