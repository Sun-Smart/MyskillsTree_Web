export class bomodulehelp {
public modulehelpiddesc :string;public modulehelpid :number;public modulekey :string;public moduletitle :string;public imageurl :string;public titlelinktext :string;public titlelinkurl :string;public contenttext :string;public contentlinktext :string;public contentlinkurl :string;public status :string;
constructor() {}
}
export interface IbomodulehelpResponse {
total: number;
results: bomodulehelp[];
}

