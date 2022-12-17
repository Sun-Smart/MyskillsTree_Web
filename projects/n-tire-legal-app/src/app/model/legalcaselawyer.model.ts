export class legalcaselawyer {
public caselawyeriddesc :string;public caselawyerid :number;public caseid :number;public lawyerid :number;public lawyeriddesc :string;public lawyertype :string;public lawyertypedesc :string;public fromdate :Date;public todate :Date;public status :string;
constructor() {}
}
export interface IlegalcaselawyerResponse {
total: number;
results: legalcaselawyer[];
}

