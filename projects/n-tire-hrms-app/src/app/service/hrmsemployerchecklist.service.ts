import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployerchecklist } from '../model/hrmsemployerchecklist.model';
import { environment } from '../../environments/environment';
import { IhrmsemployerchecklistResponse } from '../model/hrmsemployerchecklist.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployerchecklistService {
  formData: hrmsemployerchecklist;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployerchecklist[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployerchecklists(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployerchecklist', body);
    }
  }

  saveOrUpdatehrmsemployerchecklistsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployerchecklist', body);
    }
  }

  gethrmsemployerchecklistsList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployerchecklist').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployerchecklist' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployerchecklistsByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployerchecklist' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployerchecklistsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployerchecklist' + '/' + id).toPromise();
    }
  }

  deletehrmsemployerchecklist(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployerchecklist' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployerchecklist')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

