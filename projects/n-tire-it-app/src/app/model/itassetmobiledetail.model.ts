export class itassetmobiledetail {
public detailiddesc :string;public detailid :number;public assetid :number;public imei :string;public product :number;public totalcapacity :number;public model :string;public availablecapacity :number;public modelnumber :string;public modemfirmwareversion :string;public platform :string;public buildversion :string;public osname :string;public osversion :string;public status :string;
constructor() {}
}
export interface IitassetmobiledetailResponse {
total: number;
results: itassetmobiledetail[];
}

