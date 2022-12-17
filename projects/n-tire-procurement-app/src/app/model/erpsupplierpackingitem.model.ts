export class erpsupplierpackingitem {
public poid :number;public poiddesc :string;public supplierpkgid :number;public supplierpkgiddesc :string;public supplierpkgdetailid :number;public supplierpkgdetailiddesc :string;public supplierpkgitemiddesc :string;public supplierpkgitemid :number;public itemid :number;public itemiddesc :string;public uom :string;public uomdesc :string;public qty :string;public serialbatch :string;public status :string;
constructor() {}
}
export interface IerpsupplierpackingitemResponse {
total: number;
results: erpsupplierpackingitem[];
}

