export class hrmsodrequest {
public odiddesc :string;public odid :number;public reference :string;public employeeid :number;public employeeiddesc :string;public fromdate :Date;public todate :Date;public fromtime :string;public totime :string;public reason :string;public travelrequired :boolean;public advancerequired :boolean;public status :string;public earningvoucherid :number;public DeletedhrmsodadvanceIDs :string;public DeletedhrmsodclaimIDs :string;public DeletedhrmsodtravelIDs :string;
constructor() {}
}
export interface IhrmsodrequestResponse {
total: number;
results: hrmsodrequest[];
}

