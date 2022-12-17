export class bousergroupaccess {
public usergroupid :number;public usergroupiddesc :string;public accessiddesc :string;public accessid :number;public userid :number;public status :string;
constructor() {}
}
export interface IbousergroupaccessResponse {
total: number;
results: bousergroupaccess[];
}

