export class hrmsemployeetraveldocument {
public employeeid :number;public traveldociddesc :string;public traveldocid :number;public category :string;public categorydesc :string;public country :number;public countrydesc :string;public referencenumber :string;public issuedate :Date;public expirydate :Date;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeetraveldocumentResponse {
total: number;
results: hrmsemployeetraveldocument[];
}

