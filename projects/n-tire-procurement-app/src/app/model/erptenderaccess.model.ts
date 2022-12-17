export class erptenderaccess {
public accessiddesc :string;public accessid :number;public tenderid :number;public tenderiddesc :string;public usergroupid :number;public usergroupiddesc :string;public status :string;
constructor() {}
}
export interface IerptenderaccessResponse {
total: number;
results: erptenderaccess[];
}

