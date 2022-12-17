export class hrmsemployeeattendedevent {
public eventiddesc :string;public eventid :number;public employeeid :number;public employeeiddesc :string;public programtype :string;public programtypedesc :string;public programname :string;public country :string;public city :string;public venue :string;public startdate :Date;public enddate :Date;public duration :string;public organisedby :string;public nominatedby :string;public fundingagency :string;public cost :number;public programdetails :string;public notes :string;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeeattendedeventResponse {
total: number;
results: hrmsemployeeattendedevent[];
}

