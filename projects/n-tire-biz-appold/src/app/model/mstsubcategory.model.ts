export class mstsubcategory {
public subcategoryiddesc :string;public subcategoryid :number;public code :string;public name :string;public categoryid :number;public segmentid :number;public segmentiddesc :string;public status :string;
constructor() {}
}
export interface ImstsubcategoryResponse {
total: number;
results: mstsubcategory[];
}

