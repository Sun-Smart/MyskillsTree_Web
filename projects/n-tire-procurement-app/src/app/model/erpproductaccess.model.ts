export class erpproductaccess {
public accessiddesc :string;public accessid :number;public productid :number;public productiddesc :string;public usergroupid :number;public usergroupiddesc :string;public status :string;
constructor() {}
}
export interface IerpproductaccessResponse {
total: number;
results: erpproductaccess[];
}

