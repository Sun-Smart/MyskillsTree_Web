export class camspmitem {
public pmitemiddesc :string;public pmitemid :number;public pmid :number;public pmiddesc :string;public itemid :number;public itemiddesc :string;public quantity :number;public alltasks :boolean;public taskid :number;public taskiddesc :string;public remarks :string;public status :string;
constructor() {}
}
export interface IcamspmitemResponse {
total: number;
results: camspmitem[];
}

