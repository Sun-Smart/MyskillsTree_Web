export class erpsalesorderpaymentterm {
public paytermiddesc :string;public paytermid :number;public soid :number;public soiddesc :string;public versionnumber :number;public customerid :number;public paymenttermtype :string;public paymenttermtypedesc :string;public percentage :string;public description :string;public currency :string;public currencydesc :string;public amount :string;public remarks :string;public arid :number;public status :string;
constructor() {}
}
export interface IerpsalesorderpaymenttermResponse {
total: number;
results: erpsalesorderpaymentterm[];
}

