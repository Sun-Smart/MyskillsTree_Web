import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojectbillingdetail } from '../model/prjprojectbillingdetail.model';
import { environment } from '../../environments/environment';
import { IprjprojectbillingdetailResponse } from '../model/prjprojectbillingdetail.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojectbillingdetailService {
  formData: prjprojectbillingdetail;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjprojectbillingdetail[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjprojectbillingdetails(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/prjprojectbillingdetail', body);
    }
  }

  saveOrUpdateprjprojectbillingdetailsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjprojectbillingdetail', body);
    }
  }

  getprjprojectbillingdetailsList(): any {
    {
      return this.http.get(this.rootURL + '/prjprojectbillingdetail').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjprojectbillingdetail' + '/param/' + key).toPromise();
    }
  }


  getprjprojectbillingdetailsByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjprojectbillingdetail' + '/e/' + id).toPromise();
    }
  }
  getprjprojectbillingdetailsByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjprojectbillingdetail' + '/' + id).toPromise();
    }
  }

  deleteprjprojectbillingdetail(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjprojectbillingdetail' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjprojectbillingdetail')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

