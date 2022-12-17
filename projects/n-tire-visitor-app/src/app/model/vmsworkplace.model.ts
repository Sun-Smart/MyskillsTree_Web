export class vmsworkplace {
public workplaceiddesc :string;public workplaceid :number;public workplace :string;public status :string;
constructor() {}
}
export interface IvmsworkplaceResponse {
total: number;
results: vmsworkplace[];
}

