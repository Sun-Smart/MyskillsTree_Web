export class itassetconfigdetail {
public configiddesc :string;public configid :number;public assetid :number;public model :string;public manufacturer :string;public vmtype :string;public vmtypedesc :string;public vmplatform :string;public vmplatformdesc :string;public vmhost :string;public vmhostdesc :string;public operatingsystem :string;public servicepack :string;public memory :string;public ram :string;public virtualmemory :string;public processor :string;public processormanufacturer :string;public clockspeed :string;public cores :string;public harddiskmodel :string;public serialnumber :string;public harddiskmanufacturer :string;public harddiskcapacity :string;public keyboardtype :string;public keyboardtypedesc :string;public keyboardmanufacturer :string;public mousetype :string;public mousetypedesc :string;public mousemanufacturer :string;public monitortype :string;public monitortypedesc :string;public monitorserialnumber :string;public monitormanufacturer :string;public monitorresolution :string;public status :string;
constructor() {}
}
export interface IitassetconfigdetailResponse {
total: number;
results: itassetconfigdetail[];
}

