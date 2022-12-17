export class camspmtask {
public pmtaskiddesc :string;public pmtaskid :number;public tasktype :string;public tasktypedesc :string;public pmid :number;public pmiddesc :string;public orderno :number;public description :string;public tat :string;public predecessor :string;public durationfromstart :string;public durationfromstartdesc :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamspmtaskResponse {
total: number;
results: camspmtask[];
}

