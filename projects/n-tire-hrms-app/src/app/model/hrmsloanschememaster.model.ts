export class hrmsloanschememaster {
public schemeiddesc :string;public schemeid :number;public schemename :string;public validfrom :Date;public validto :Date;public status :string;public DeletedhrmsloanschemedetailIDs :string;public DeletedhrmsemployeeloanrequestIDs :string;
constructor() {}
}
export interface IhrmsloanschememasterResponse {
total: number;
results: hrmsloanschememaster[];
}

