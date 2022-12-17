export class hrmsemployeetour {
public visitiddesc :string;public visitid :number;public employeeid :number;public employeeiddesc :string;public visittype :string;public visittypedesc :string;public purposeofvisit :string;public travelmode :string;public estimatedtripcost :number;public placeofvisit :string;public visitcity :string;public submitteddate :Date;public tripstartdate :Date;public tripenddate :Date;public duration :string;public details :string;public notes :string;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeetourResponse {
total: number;
results: hrmsemployeetour[];
}

