export class umsfeestructuredetail {
    public feedetailid: number; public feeid: number; public feecategory: string; public feecategorydesc: string; public fee: number; public status: string;
    constructor() { }
}
export interface IumsfeestructuredetailResponse {
    total: number;
    results: umsfeestructuredetail[];
}

