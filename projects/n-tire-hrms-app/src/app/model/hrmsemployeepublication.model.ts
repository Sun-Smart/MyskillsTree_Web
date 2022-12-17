export class hrmsemployeepublication {
public publicationiddesc :string;public publicationid :number;public employeeid :number;public employeeiddesc :string;public publicationtype :string;public publicationtypedesc :string;public efforttype :string;public publicationdate :Date;public publicationyear :number;public title :string;public details :string;public publishername :string;public volumeno :string;public authors :string;public isbn :string;public citation :string;public notes :string;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeepublicationResponse {
total: number;
results: hrmsemployeepublication[];
}

