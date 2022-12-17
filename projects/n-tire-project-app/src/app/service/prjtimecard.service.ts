import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prjtimecard } from '../model/prjtimecard.model';
import { environment } from '../../environments/environment';
import { IprjtimecardResponse } from '../model/prjtimecard.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class prjtimecardService {
  formData: prjtimecard;
  readonly rootURL = AppConstants.ntireprojectURL;
  list: prjtimecard[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateprjtimecards(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(this.rootURL + '/prjtimecard', body);
    }
  }

  saveOrUpdateprjtimecardsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(this.rootURL + '/prjtimecard', body);
    }
  }

  getprjtimecardsList(): any {
    {
      return this.http.get(this.rootURL + '/prjtimecard').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(this.rootURL + '/prjtimecard' + '/param/' + key).toPromise();
    }
  }


  getprjtimecardsByEID(id: any): any {
    {
      return this.http.get(this.rootURL + '/prjtimecard' + '/e/' + id).toPromise();
    }
  }
  getprjtimecardsByID(id: number): any {
    {
      return this.http.get(this.rootURL + '/prjtimecard' + '/' + id).toPromise();
    }
  }

  deleteprjtimecard(id: number): any {
    {
      return this.http.delete(this.rootURL + '/prjtimecard' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(this.rootURL + '/prjtimecard')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

