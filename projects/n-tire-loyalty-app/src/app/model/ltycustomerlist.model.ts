export class ltycustomerlist {
public customerlistiddesc :string;public customerlistid :number;public listid :number;public customerid :number;public customeriddesc :string;public status :string;
constructor() {}
}
export interface IltycustomerlistResponse {
total: number;
results: ltycustomerlist[];
}

