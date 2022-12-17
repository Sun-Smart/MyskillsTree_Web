export class legalfreenote {
public freenotesiddesc :string;public freenotesid :number;public entrydate :Date;public enteredby :number;public enteredbydesc :string;public subject :string;public freenotes :string;public caseid :number;public attachment :string;public status :string;
constructor() {}
}
export interface IlegalfreenoteResponse {
total: number;
results: legalfreenote[];
}

