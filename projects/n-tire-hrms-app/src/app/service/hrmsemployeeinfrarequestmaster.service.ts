import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeeinfrarequestmaster } from '../model/hrmsemployeeinfrarequestmaster.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeeinfrarequestmasterResponse } from '../model/hrmsemployeeinfrarequestmaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeeinfrarequestmasterService {
  formData: hrmsemployeeinfrarequestmaster;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeeinfrarequestmaster[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeeinfrarequestmasters(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeinfrarequestmaster', body);
    }
  }

  saveOrUpdatehrmsemployeeinfrarequestmastersList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeeinfrarequestmaster', body);
    }
  }

  gethrmsemployeeinfrarequestmastersList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeinfrarequestmaster').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeinfrarequestmaster' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeeinfrarequestmastersByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeinfrarequestmaster' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeeinfrarequestmastersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeinfrarequestmaster' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeeinfrarequestmaster(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeeinfrarequestmaster' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeeinfrarequestmaster')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

