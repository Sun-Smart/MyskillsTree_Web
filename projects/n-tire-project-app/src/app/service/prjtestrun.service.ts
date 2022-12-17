import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjtestrun } from '../model/prjtestrun.model';
import { prjtestrundetail } from '../model/prjtestrundetail.model';
import { environment } from '../../environments/environment';
import { IprjtestrunResponse } from '../model/prjtestrun.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjtestrunService {
  formData: prjtestrun;
  readonly rootURL = AppConstants.ntireprojectURL;
  prjtestrundetails: prjtestrundetail[] = [];
  list: prjtestrun[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjtestruns(): any {
    {
      var body = {
        ...this.formData,
        prjtestrundetails: this.prjtestrundetails.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(this.rootURL + '/prjtestrun', body);
    }
  }

  saveOrUpdateprjtestrunsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjtestrun', body);
    }
  }

  getprjtestrunsList(): any {
    {
      return this.http.get(this.rootURL + '/prjtestrun').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjtestrun' + '/param/' + key).toPromise();
    }
  }


  getprjtestrunsByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjtestrun' + '/e/' + id).toPromise();
    }
  }
  getprjtestrunsByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjtestrun' + '/' + id).toPromise();
    }
  }

  deleteprjtestrun(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjtestrun' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.prjtestrundetails = [];
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjtestrun')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

