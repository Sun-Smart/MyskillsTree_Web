export class vmsparking {
public parkingiddesc :string;public parkingid :number;public parkingslot :string;public status :string;
constructor() {}
}
export interface IvmsparkingResponse {
total: number;
results: vmsparking[];
}

