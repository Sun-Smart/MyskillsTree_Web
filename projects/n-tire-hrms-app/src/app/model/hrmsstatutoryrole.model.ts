export class hrmsstatutoryrole {
public statutoryid :number;public statutoryroleiddesc :string;public statutoryroleid :number;public roleid :number;public roleiddesc :string;public status :string;
constructor() {}
}
export interface IhrmsstatutoryroleResponse {
total: number;
results: hrmsstatutoryrole[];
}

