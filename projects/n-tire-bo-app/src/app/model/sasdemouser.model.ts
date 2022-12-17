export class sasdemouser {
    public registrationid: number; public companyname: string; public url: string; public username: string; public password: string; public firstname: string; public lastname: string; public emailaddress: string; public countryid: number; public countryiddesc: string; public phonenumber: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IsasdemouserResponse {
    total: number;
    results: sasdemouser[];
}

