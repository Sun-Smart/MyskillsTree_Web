export class hrmsshiftmaster {
public shiftiddesc :string;public shiftid :number;public shiftname :string;public starttime :string;public endtime :string;public previousday :boolean;public graceperiod :number;public allowedgraceperiods :number;public overtimeminutes :number;public workinghours :string;public status :string;public DeletedhrmsemployeeshiftIDs :string;public DeletedhrmsemployeeshiftpreferenceIDs :string;
constructor() {}
}
export interface IhrmsshiftmasterResponse {
total: number;
results: hrmsshiftmaster[];
}

