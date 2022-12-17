export class hrmsadvertisementmaster {
public advertisementiddesc :string;public advertisementid :number;public advertisementcode :string;public releasedate :Date;public remarks :string;public status :string;public DeletedhrmsadvertisementdetailIDs :string;
constructor() {}
}
export interface IhrmsadvertisementmasterResponse {
total: number;
results: hrmsadvertisementmaster[];
}

