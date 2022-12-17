export class hrmsemployeepresentation {
public employeeid :number;public presentationiddesc :string;public presentationid :number;public category :string;public categorydesc :string;public presentationdate :Date;public topic :string;public presentedforum :string;public mode :string;public modedesc :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeepresentationResponse {
total: number;
results: hrmsemployeepresentation[];
}

