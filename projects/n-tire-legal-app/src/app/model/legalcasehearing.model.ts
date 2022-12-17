export class legalcasehearing {
public hearingiddesc :string;public hearingid :number;public caseid :number;public hearingdate :Date;public lawyerid :number;public lawyeriddesc :string;public additionallawyerid1 :number;public additionallawyerid1desc :string;public additionallawyerid2 :number;public additionallawyerid2desc :string;public remarks :string;public actiontobetaken :string;public nexthearingdate :Date;public attachment :string;public status :string;public DeletedboexpenseIDs :string;public DeletedlegalcasehearingdetailnoteIDs :string;
constructor() {}
}
export interface IlegalcasehearingResponse {
total: number;
results: legalcasehearing[];
}

