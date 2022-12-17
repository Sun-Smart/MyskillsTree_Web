export class hrmsemployeememo {
public memoiddesc :string;public memoid :number;public employeeid :number;public memodate :Date;public memocategory :string;public memocategorydesc :string;public template :string;public memodetails :string;public status :string;
constructor() {}
}
export interface IhrmsemployeememoResponse {
total: number;
results: hrmsemployeememo[];
}

