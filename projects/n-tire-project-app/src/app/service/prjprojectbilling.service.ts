import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjprojectbilling } from '../model/prjprojectbilling.model';
import { prjprojectbillingdetail } from '../model/prjprojectbillingdetail.model';
import { environment } from '../../environments/environment';
import { IprjprojectbillingResponse } from '../model/prjprojectbilling.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjprojectbillingService {
  formData: prjprojectbilling;
  readonly rootURL = AppConstants.ntireprojectURL;
  prjprojectbillingdetails: prjprojectbillingdetail[] = [];
  list: prjprojectbilling[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjprojectbillings(): any {
    {
      var body = {
        ...this.formData,
        prjprojectbillingdetails: this.prjprojectbillingdetails.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(this.rootURL + '/prjprojectbilling', body);
    }
  }

  saveOrUpdateprjprojectbillingsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjprojectbilling', body);
    }
  }

  getprjprojectbillingsList(): any {
    {
      return this.http.get(this.rootURL + '/prjprojectbilling').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjprojectbilling' + '/param/' + key).toPromise();
    }
  }


  getprjprojectbillingsByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjprojectbilling' + '/e/' + id).toPromise();
    }
  }
  getprjprojectbillingsByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjprojectbilling' + '/' + id).toPromise();
    }
  }

  deleteprjprojectbilling(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjprojectbilling' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.prjprojectbillingdetails = [];
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjprojectbilling')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

