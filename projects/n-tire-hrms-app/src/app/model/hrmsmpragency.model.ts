export class hrmsmpragency {
public mprid :number;public raassigniddesc :string;public raassignid :number;public agencyid :number;public agencyiddesc :string;public assignedquantity :number;public startdate :Date;public completiondate :Date;public chargesperresource :number;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsmpragencyResponse {
total: number;
results: hrmsmpragency[];
}

