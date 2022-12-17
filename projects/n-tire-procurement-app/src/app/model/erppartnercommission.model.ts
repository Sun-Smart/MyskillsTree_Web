export class erppartnercommission {
public commissioniddesc :string;public commissionid :number;public invoiceid :number;public partnerid :number;public rate :number;public amount :number;public status :string;
constructor() {}
}
export interface IerppartnercommissionResponse {
total: number;
results: erppartnercommission[];
}

