export class erpphysicalinventorydetail {
public pidetailiddesc :string;public pidetailid :number;public piid :number;public piiddesc :string;public branchid :number;public branchiddesc :string;public locationid :number;public locationiddesc :string;public itemid :number;public itemiddesc :string;public serialbatch :string;public binid :number;public stockqty :string;public uom :string;public uomdesc :string;public itemcondition :string;public itemconditiondesc :string;public availableqty :string;public difference :string;public action :string;public actiondesc :string;public movelocation :number;public movelocationdesc :string;public movebin :number;public movebindesc :string;public remarks :string;public status :string;
constructor() {}
}
export interface IerpphysicalinventorydetailResponse {
total: number;
results: erpphysicalinventorydetail[];
}

