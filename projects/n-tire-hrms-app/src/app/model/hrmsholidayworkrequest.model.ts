export class hrmsholidayworkrequest {
public workrequestiddesc :string;public workrequestid :number;public reference :string;public employeeid :number;public employeeiddesc :string;public requestdate :Date;public reason :string;public attachment :string;public status :string;public DeletedhrmscoffrequestIDs :string;
constructor() {}
}
export interface IhrmsholidayworkrequestResponse {
total: number;
results: hrmsholidayworkrequest[];
}

