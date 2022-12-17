export class botemplate {
public templateiddesc :string;public templateid :number;public templatetype :string;public templatetypedesc :string;public templatecode :string;public templatetext :string;public status :string;
constructor() {}
}
export interface IbotemplateResponse {
total: number;
results: botemplate[];
}

