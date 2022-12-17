export class mstterm {
public termiddesc :string;public termid :number;public versionnumber :number;public versiondate :Date;public terms :string;public currentterm :boolean;public status :string;
constructor() {}
}
export interface ImsttermResponse {
total: number;
results: mstterm[];
}

