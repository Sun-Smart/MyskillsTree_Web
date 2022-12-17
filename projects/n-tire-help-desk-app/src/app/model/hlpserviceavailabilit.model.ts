export class hlpserviceavailabilit {
public availabilityiddesc :string;public availabilityid :number;public sourcefield :string;public sourcereference :number;public servicehours :number;public downhours :number;public availability :number;public remarks :string;public status :string;
constructor() {}
}
export interface IhlpserviceavailabilitResponse {
total: number;
results: hlpserviceavailabilit[];
}

