import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjdailystandupdetail } from '../model/prjdailystandupdetail.model';
import { environment } from '../../environments/environment';
import { IprjdailystandupdetailResponse } from '../model/prjdailystandupdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjdailystandupdetailService {
  formData: prjdailystandupdetail;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjdailystandupdetail[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjdailystandupdetails(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/prjdailystandupdetail', body);
    }
  }

  saveOrUpdateprjdailystandupdetailsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjdailystandupdetail', body);
    }
  }

  getprjdailystandupdetailsList(): any {
    {
      return this.http.get(this.rootURL + '/prjdailystandupdetail').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjdailystandupdetail' + '/param/' + key).toPromise();
    }
  }


  getprjdailystandupdetailsByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjdailystandupdetail' + '/e/' + id).toPromise();
    }
  }
  getprjdailystandupdetailsByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjdailystandupdetail' + '/' + id).toPromise();
    }
  }

  deleteprjdailystandupdetail(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjdailystandupdetail' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjdailystandupdetail')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

