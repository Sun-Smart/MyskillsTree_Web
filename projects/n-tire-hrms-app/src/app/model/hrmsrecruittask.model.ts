export class hrmsrecruittask {
public taskiddesc :string;public taskid :number;public currentdate :Date;public roleid :number;public roleiddesc :string;public userid :number;public useriddesc :string;public totalcount :number;public status :string;
constructor() {}
}
export interface IhrmsrecruittaskResponse {
total: number;
results: hrmsrecruittask[];
}

