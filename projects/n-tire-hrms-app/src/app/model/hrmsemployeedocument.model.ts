export class hrmsemployeedocument {
public employeeid :number;public dociddesc :string;public docid :number;public category :string;public categorydesc :string;public country :number;public countrydesc :string;public referencenumber :string;public issuedate :Date;public expirydate :Date;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeedocumentResponse {
total: number;
results: hrmsemployeedocument[];
}

