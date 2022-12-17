export class dmsupload {
public uploadiddesc :string;public uploadid :number;public userid :number;public useriddesc :string;public uploadeddate :Date;public foldername :string;public uploadstatus :string;public uploadstatusdesc :string;public status :string;
constructor() {}
}
export interface IdmsuploadResponse {
total: number;
results: dmsupload[];
}

