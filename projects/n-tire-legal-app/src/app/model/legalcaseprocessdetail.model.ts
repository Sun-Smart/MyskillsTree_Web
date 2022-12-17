export class legalcaseprocessdetail {
public caseid :number;public caseprocessiddesc :string;public caseprocessid :number;public internalreferencenumber :string;public processid :number;public processiddesc :string;public lawyerid :number;public lawyeriddesc :string;public assignto :string;public estimatedtime :string;public timespent :string;public processdetails :string;public actiontobetaken :string;public remarks :string;public attachment :string;public status :string;public DeletedboexpenseIDs :string;
constructor() {}
}
export interface IlegalcaseprocessdetailResponse {
total: number;
results: legalcaseprocessdetail[];
}

