export class erpsupplierpackingdetail {
public poid :number;public poiddesc :string;public supplierpkgid :number;public supplierpkgiddesc :string;public supplierpkgdetailiddesc :string;public supplierpkgdetailid :number;public cartonnumber :string;public dimension :string;public weight :string;public status :string;public DeletederpsupplierpackingitemIDs :string;
constructor() {}
}
export interface IerpsupplierpackingdetailResponse {
total: number;
results: erpsupplierpackingdetail[];
}

