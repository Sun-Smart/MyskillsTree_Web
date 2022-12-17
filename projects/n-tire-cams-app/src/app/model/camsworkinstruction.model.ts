export class camsworkinstruction {
public workinstructioniddesc :string;public workinstructionid :number;public workorderdetailid :number;public workorderdetailiddesc :string;public workorderid :number;public workorderiddesc :string;public scheduleid :number;public scheduletaskid :number;public pmid :number;public pmiddesc :string;public pmtaskid :number;public pminstructionid :number;public sequence :number;public code :string;public details :string;public verified :boolean;public remarks :string;public status :string;
constructor() {}
}
export interface IcamsworkinstructionResponse {
total: number;
results: camsworkinstruction[];
}

