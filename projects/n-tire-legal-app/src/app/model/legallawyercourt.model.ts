export class legallawyercourt {
public lawyercourtiddesc :string;public lawyercourtid :number;public lawyerid :number;public courtid :number;public status :string;
constructor() {}
}
export interface IlegallawyercourtResponse {
total: number;
results: legallawyercourt[];
}

