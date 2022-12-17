export class hlpservicecontinuityplan {
public planiddesc :string;public planid :number;public introduction :string;public purpose :string;public scope :string;public status :string;public DeletedhlpservicecontinuityplandetailIDs :string;
constructor() {}
}
export interface IhlpservicecontinuityplanResponse {
total: number;
results: hlpservicecontinuityplan[];
}

