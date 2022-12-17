export class erpfajournaldetail {
public jdetailiddesc :string;public jdetailid :number;public journalid :number;public accountid :number;public accountiddesc :string;public txntype :string;public txntypedesc :string;public partytype :string;public party :number;public debit :number;public credit :number;public status :string;
constructor() {}
}
export interface IerpfajournaldetailResponse {
total: number;
results: erpfajournaldetail[];
}

