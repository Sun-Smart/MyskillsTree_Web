export class hrmsemployeeasset {
public employeeid :number;public employeeiddesc :string;public employeeassetiddesc :string;public employeeassetid :number;public assetid :number;public assetiddesc :string;public assetcode :string;public assetname :string;public assetcheckoutdate :Date;public checkedin :boolean;public assetcheckindate :Date;public description :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeassetResponse {
total: number;
results: hrmsemployeeasset[];
}

