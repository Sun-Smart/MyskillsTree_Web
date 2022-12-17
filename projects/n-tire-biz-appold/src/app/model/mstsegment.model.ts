export class mstsegment {
public segmentiddesc :string;public segmentid :number;public code :string;public name :string;public status :string;public Deleted_mstcategory_IDs :string;
constructor() {}
}
export interface ImstsegmentResponse {
total: number;
results: mstsegment[];
}

