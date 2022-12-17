export class mstcategory {
public categoryiddesc :string;public categoryid :number;public code :string;public name :string;public segmentid :number;public status :string;public Deleted_mstsubcategory_IDs :string;
constructor() {}
}
export interface ImstcategoryResponse {
total: number;
results: mstcategory[];
}

