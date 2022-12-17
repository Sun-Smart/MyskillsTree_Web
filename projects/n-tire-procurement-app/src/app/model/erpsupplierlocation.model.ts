export class erpsupplierlocation {
public esliddesc :string;public eslid :number;public supplierid :number;public supplieriddesc :string;public location :string;public branchid :number;public branchiddesc :string;public effectivefrom :Date;public remarks :string;public status :string;
constructor() {}
}
export interface IerpsupplierlocationResponse {
total: number;
results: erpsupplierlocation[];
}

