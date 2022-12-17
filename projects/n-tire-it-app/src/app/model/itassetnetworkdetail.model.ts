export class itassetnetworkdetail {
public networkiddesc :string;public networkid :number;public assetid :number;public ipaddress :string;public macaddress :string;public nic :string;public network :string;public defaultgateway :string;public dhcpenabled :boolean;public dhcpserver :string;public type :string;public typedesc :string;public details :string;public status :string;
constructor() {}
}
export interface IitassetnetworkdetailResponse {
total: number;
results: itassetnetworkdetail[];
}

