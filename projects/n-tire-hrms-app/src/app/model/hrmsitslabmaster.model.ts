export class hrmsitslabmaster {
public slabiddesc :string;public slabid :number;public gender :string;public genderdesc :string;public fromamount :number;public toamount :number;public taxrate :number;public status :string;
constructor() {}
}
export interface IhrmsitslabmasterResponse {
total: number;
results: hrmsitslabmaster[];
}

