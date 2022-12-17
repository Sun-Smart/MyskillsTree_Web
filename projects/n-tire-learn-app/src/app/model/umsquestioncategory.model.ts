export class umsquestioncategory {
    public categoryid: number; public categoryname: string; public maxquestions: number; public status: string;
    constructor() { }
}
export interface IumsquestioncategoryResponse {
    total: number;
    results: umsquestioncategory[];
}

