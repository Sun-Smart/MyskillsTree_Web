export class erptendersuppliercomplianceresponse {
public complianceiddesc :string;public complianceid :number;public tenderid :number;public compliancetype :string;public compliancetypedesc :string;public details :string;public responseid :number;public responseiddesc :string;public complied :boolean;public remarks :string;public sequence :number;public status :string;
constructor() {}
}
export interface IerptendersuppliercomplianceresponseResponse {
total: number;
results: erptendersuppliercomplianceresponse[];
}

