import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeestationaryrequest } from '../model/hrmsemployeestationaryrequest.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeestationaryrequestResponse } from '../model/hrmsemployeestationaryrequest.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeestationaryrequestService {
  formData: hrmsemployeestationaryrequest;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeestationaryrequest[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeestationaryrequests(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeestationaryrequest', body);
    }
  }

  saveOrUpdatehrmsemployeestationaryrequestsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeestationaryrequest', body);
    }
  }

  gethrmsemployeestationaryrequestsList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeestationaryrequest').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeestationaryrequest' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeestationaryrequestsByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeestationaryrequest' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeestationaryrequestsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeestationaryrequest' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeestationaryrequest(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeestationaryrequest' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeestationaryrequest')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

