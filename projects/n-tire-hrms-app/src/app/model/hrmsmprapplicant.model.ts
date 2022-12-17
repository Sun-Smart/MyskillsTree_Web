export class hrmsmprapplicant {
public mprid :number;public applicantid :number;public applicantiddesc :string;public mprapplicantiddesc :string;public mprapplicantid :number;public offerdate :Date;public planneddoj :Date;public joineddate :Date;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsmprapplicantResponse {
total: number;
results: hrmsmprapplicant[];
}

