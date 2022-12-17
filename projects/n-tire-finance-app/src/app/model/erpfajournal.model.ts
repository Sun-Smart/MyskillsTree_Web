export class erpfajournal {
public journaliddesc :string;public journalid :number;public branchid :number;public branchiddesc :string;public type :string;public typedesc :string;public reference :string;public journaldate :Date;public journalcode :string;public mode :string;public modedesc :string;public category :string;public categorydesc :string;public ismulticurrency :boolean;public billreference :string;public billdate :Date;public billduedate :Date;public otherreference :string;public otherdate :Date;public narration :string;public cdreference :string;public currency :string;public cdamount :number;public bank :number;public bankdesc :string;public chequenumber :number;public customfield :string;public attachment :string;public status :string;public DeletederpfajournaldetailIDs :string;public DeletederpfajournalcostcenterIDs :string;
constructor() {}
}
export interface IerpfajournalResponse {
total: number;
results: erpfajournal[];
}

