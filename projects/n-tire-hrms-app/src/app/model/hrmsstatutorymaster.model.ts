export class hrmsstatutorymaster {
public statutoryiddesc :string;public statutoryid :number;public statutorycode :string;public statutoryname :string;public status :string;public DeletedhrmsstatutorydetailIDs :string;public DeletedhrmsstatutoryroleIDs :string;
constructor() {}
}
export interface IhrmsstatutorymasterResponse {
total: number;
results: hrmsstatutorymaster[];
}

