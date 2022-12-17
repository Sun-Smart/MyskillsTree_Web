import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bouserrolemaster } from '../model/bouserrolemaster.model';
import { bousertypemenuaccess } from '../model/bousertypemenuaccess.model';
import { hrmsinterviewrolescoring } from '../../../../n-tire-hrms-app/src/app/model/hrmsinterviewrolescoring.model';
import { environment } from '../../environments/environment';
import { IbouserrolemasterResponse } from '../model/bouserrolemaster.model';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppConstants} from '../shared/helper'
import { SessionService } from '../pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class bouserrolemasterService {
  formData: bouserrolemaster;
  readonly rootURL = AppConstants.baseURL;
  bousertypemenuaccesses: bousertypemenuaccess[]=[];
  Insertbousertypemenuaccesses: bousertypemenuaccess[]=[];
  bouserrolemasters: bouserrolemaster[]=[];
  hrmsinterviewrolescorings: hrmsinterviewrolescoring[]=[];
  list: bouserrolemaster[];

  constructor(private http: HttpClient,private sessionService: SessionService) { }

valid()
{
return true;

}
  saveOrUpdatebouserrolemasters():any {
  if (this.valid()){ 
    var body = {
      ...this.formData,
      bousertypemenuaccesses: this.Insertbousertypemenuaccesses.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      bouserrolemasters: this.bouserrolemasters.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
      hrmsinterviewrolescorings: this.hrmsinterviewrolescorings.filter(function(el) { return  el!=undefined &&  Object.keys(el).length!=0; }),
    };
    return this.http.post(AppConstants.ntireboURL + '/bouserrolemaster', body);
  }
  }

  saveOrUpdatebouserrolemastersList():any {
  if (this.valid()){ 
    var body = {
    list:this.list,
    };
    return this.http.post(AppConstants.ntireboURL + '/bouserrolemaster', body);
  }
  }

  getbouserrolemastersList():any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserrolemaster').toPromise();
  }
  }
  getListByuserroleid(userroleid:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserrolemaster'+'/userroleid/'+userroleid).toPromise();
  }
  }

  getList(key:string):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserrolemaster'+'/param/'+key).toPromise();
  }
  }


  getbouserrolemastersByEID(id:any):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserrolemaster'+'/e/'+id).toPromise();
  }
  }
  getbouserrolemastersByID(id:number):any {
  if (this.valid()){ 
    return this.http.get(AppConstants.ntireboURL + '/bouserrolemaster'+'/'+id).toPromise();
  }
  }

  deletebouserrolemaster(id:number):any {
  if (this.valid()){ 
    return this.http.delete(AppConstants.ntireboURL + '/bouserrolemaster'+'/'+id).toPromise();
  }
  }
clearList(){
this.bousertypemenuaccesses = [];
this.bouserrolemasters = [];
this.hrmsinterviewrolescorings = [];
}
refreshList():any{
  if (this.valid()){ 
this.http.get(AppConstants.ntireboURL + '/bouserrolemaster')
.toPromise()
.then(res => this.list = res as any[]);
}
}
search(filter: {name: string} = {name: ''}, page = 1): Observable<IbouserrolemasterResponse> {
return this.http.get<IbouserrolemasterResponse>(AppConstants.ntireboURL+'/bouserrolemaster')
.pipe(
tap((response: IbouserrolemasterResponse) => {
console.log(response);
//debugger;
var response1;
response1=response;
response.results = response1.map(bouserrolemaster => new bouserrolemaster(bouserrolemaster.userroleid,bouserrolemaster.userrole,bouserrolemaster.thumbnail,bouserrolemaster.musthaveskills,bouserrolemaster.preferredskills,bouserrolemaster.keywords,bouserrolemaster.dealbreakers,bouserrolemaster.softskills,bouserrolemaster.additionalnotes,bouserrolemaster.salary,bouserrolemaster.screeningprocess,bouserrolemaster.phoneinterviewers,bouserrolemaster.onsiteinterviewprocess,bouserrolemaster.points,bouserrolemaster.advertisementtitle1,bouserrolemaster.advertisementdetails1,bouserrolemaster.advertisementtitle2,bouserrolemaster.advertisementdetails2,bouserrolemaster.advertisementtitle3,bouserrolemaster.advertisementdetails3,bouserrolemaster.status,"","",""))
// Not filtering in the server since in-memory-web-api has somewhat restricted api
.filter(bouserrolemaster => bouserrolemaster.userrole.includes(filter.name))

return response;
})
);
}



}

