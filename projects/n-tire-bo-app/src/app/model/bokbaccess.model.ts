export class bokbaccess {
public accessiddesc :string;public accessid :number;public kbid :number;public kbiddesc :string;public usergroupid :number;public usergroupiddesc :string;public status :string;
constructor() {}
}
export interface IbokbaccessResponse {
total: number;
results: bokbaccess[];
}

