export class boemail {
public mailiddesc :string;public mailid :number;public emailtemplateid :number;public sourcefield :string;public sourcereference :number;public fromemail :string;public toemail :string;public cc :string;public subject :string;public emailtext :string;public mailstatus :string;public mailstatusdesc :string;public status :string;
constructor() {}
}
export interface IboemailResponse {
total: number;
results: boemail[];
}

