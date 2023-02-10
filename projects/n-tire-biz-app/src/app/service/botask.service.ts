import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { botask } from '../model/botask.model';
import { botaskresponse } from '../model/botaskresponse.model';
import { environment } from '../../environments/environment';
import { IbotaskResponse } from '../model/botask.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class botaskService {
  readonly rootURL = AppConstants.baseURL;
  Authorization_token: string;
  constructor(private http: HttpClient, private sessionService: SessionService) {
    this.Authorization_token = localStorage.getItem('token')
  }

  valid() {
    return true;

  }
  saveOrUpdate_botasks(formData, botaskresponses,): any {
    if (this.valid()) {
      var body = {
        ...formData,
        botaskresponses: botaskresponses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirebizURL + '/botask', body);
    }
  }

  getDefaultData(): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botask' + '/getdefaultdata').toPromise();
    }
  }
  get_botasks_List(userid:any): any {
    if (this.valid()) {
      debugger;
      // return this.http.get(AppConstants.ntirebizURL + '/botask').toPromise();
      return this.http.get(AppConstants.ntirebizURL + '/botask/actionid/' + userid).toPromise();
    }
  }


  //Apr-18 code added by dhana
  deleteNotification(notify) {
    if (this.valid()) {
      console.log(notify);
      let option = new HttpHeaders().set('Authorization', 'Bearer' + " " + this.Authorization_token);
      return this.http.post(AppConstants.ntirebizURL + '/botask', notify, { headers: option });
    }
  }

  getListBy_taskid(taskid: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botask' + '/taskid/' + taskid).toPromise();
    }
  }

  getListBy_sourcereference(sourcereference: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botask' + '/sourcereference/' + sourcereference).toPromise();
    }
  }

  getList(key: string): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botask' + '/param/' + key).toPromise();
    }
  }


  get_botasks_ByEID(id: any): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botask' + '/e/' + id).toPromise();
    }
  }
  get_botasks_ByID(id: number): any {
    if (this.valid()) {
      return this.http.get(AppConstants.ntirebizURL + '/botask' + '/' + id).toPromise();
    }
  }

  delete_botask(id: number): any {
    if (this.valid()) {
      return this.http.delete(AppConstants.ntirebizURL + '/botask' + '/' + id).toPromise();
    }
  }

  getList_tasktype(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/botask' + '/getList_tasktype/').toPromise();
  }

  getList_priority(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/botask' + '/getList_priority/').toPromise();
  }

  getList_taskstatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/botask' + '/getList_taskstatus/').toPromise();
  }

  getList_performancestatus(): any {
    return this.http.get(AppConstants.ntirecrmURL + '/botask' + '/getList_performancestatus/').toPromise();
  }


}

