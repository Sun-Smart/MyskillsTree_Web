export class hrmsemployeekra {
public empkraiddesc :string;public empkraid :number;public employeeid :number;public kraid :number;public kraiddesc :string;public kpiid :number;public kpiiddesc :string;public expectedvalue :number;public actualvalue :number;public plannedweightage :number;public actualweightage :number;public remarks :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsemployeekraResponse {
total: number;
results: hrmsemployeekra[];
}

