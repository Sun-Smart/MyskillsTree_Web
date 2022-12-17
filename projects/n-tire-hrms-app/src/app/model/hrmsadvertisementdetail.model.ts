export class hrmsadvertisementdetail {
public advertisementid :number;public detailiddesc :string;public detailid :number;public mprid :number;public mpriddesc :string;public roleid :number;public roleiddesc :string;public quantity :number;public media :string;public mediatype :string;public mediatypedesc :string;public fromdate :Date;public todate :Date;public details :string;public attachment :string;public status :string;
constructor() {}
}
export interface IhrmsadvertisementdetailResponse {
total: number;
results: hrmsadvertisementdetail[];
}

