export class hrmskpimaster {
public kraid :number;public kpiiddesc :string;public kpiid :number;public kpidescription :string;public weightagepercent :number;public expectedvalue :number;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmskpimasterResponse {
total: number;
results: hrmskpimaster[];
}

