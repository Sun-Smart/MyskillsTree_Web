export class dmsarchive {
public archiveiddesc :string;public archiveid :number;public documentid :number;public documentiddesc :string;public archivedate :Date;public status :string;
constructor() {}
}
export interface IdmsarchiveResponse {
total: number;
results: dmsarchive[];
}

