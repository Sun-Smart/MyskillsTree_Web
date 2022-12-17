export class erptaxmaster {
public taxiddesc :string;public taxid :number;public taxcode :string;public taxname :string;public tags :string;public taxtype :string;public taxtypedesc :string;public taxpercentage :string;public accountgroup :number;public accountgroupdesc :string;public description :string;public openingbalancetype :string;public openingbalancetypedesc :string;public openingbalance :number;public formrequired :boolean;public itemcategoryid :number;public itemcategoryiddesc :string;public customfield :string;public attachment :string;public comments :string;public status :string;public DeletederptaxcalculationIDs :string;
constructor() {}
}
export interface IerptaxmasterResponse {
total: number;
results: erptaxmaster[];
}

