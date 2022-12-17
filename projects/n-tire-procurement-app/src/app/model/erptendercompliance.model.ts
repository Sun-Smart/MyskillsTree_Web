export class erptendercompliance {
public complianceiddesc :string;public complianceid :number;public compliancetype :string;public compliancetypedesc :string;public tenderid :number;public tenderiddesc :string;public description :string;public details :string;public mandatory :boolean;public remarksnotallowed :boolean;public documentsrequired :string;public sequence :number;public status :string;
constructor() {}
}
export interface IerptendercomplianceResponse {
total: number;
results: erptendercompliance[];
}

