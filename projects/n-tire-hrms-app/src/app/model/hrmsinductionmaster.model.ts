export class hrmsinductionmaster {
public inductionmasteriddesc :string;public inductionmasterid :number;public inductiontopic :string;public copyfrom :string;public startdate :Date;public status :string;public DeletedhrmsinductionemployeeIDs :string;public DeletedhrmsinductionscheduleIDs :string;
constructor() {}
}
export interface IhrmsinductionmasterResponse {
total: number;
results: hrmsinductionmaster[];
}

