export class hlpslapriority {
public servicelevelpriorityiddesc :string;public servicelevelpriorityid :number;public servicelevelid :number;public priorityid :string;public priorityiddesc :string;public responseduration :string;public resolutionduration :string;public status :string;
constructor() {}
}
export interface IhlpslapriorityResponse {
total: number;
results: hlpslapriority[];
}

