export class erpdcdetail {
public dcid :number;public dciddesc :string;public dcdetailiddesc :string;public dcdetailid :number;public cartonnumber :string;public dimension :string;public weight :string;public status :string;
constructor() {}
}
export interface IerpdcdetailResponse {
total: number;
results: erpdcdetail[];
}

