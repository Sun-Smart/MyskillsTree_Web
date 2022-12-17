export class bodynamicformdetail {
public tableid :number;public tableiddesc :string;public formdetailiddesc :string;public formdetailid :number;public formid :number;public fieldname :string;public controltype :string;public controltypedesc :string;public required :boolean;public fk :boolean;public sequence :number;public configurations :string;public status :string;
constructor() {}
}
export interface IbodynamicformdetailResponse {
total: number;
results: bodynamicformdetail[];
}

