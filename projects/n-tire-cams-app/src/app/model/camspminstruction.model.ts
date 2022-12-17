export class camspminstruction {
public pminstructioniddesc :string;public pminstructionid :number;public pmid :number;public pmiddesc :string;public sequence :number;public code :string;public details :string;public alltasks :boolean;public taskid :number;public taskiddesc :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamspminstructionResponse {
total: number;
results: camspminstruction[];
}

