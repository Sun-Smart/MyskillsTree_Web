export class erptaxcalculation {
public calculationiddesc :string;public calculationid :number;public taxid :number;public taxiddesc :string;public calculationtype :string;public calculationtypedesc :string;public accountid :number;public accountiddesc :string;public rate :number;public amount :number;public total :number;public status :string;
constructor() {}
}
export interface IerptaxcalculationResponse {
total: number;
results: erptaxcalculation[];
}

