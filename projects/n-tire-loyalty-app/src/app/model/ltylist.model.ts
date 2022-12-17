export class ltylist {
public listiddesc :string;public listid :number;public listname :string;public status :string;public DeletedltycustomerlistIDs :string;
constructor() {}
}
export interface IltylistResponse {
total: number;
results: ltylist[];
}

