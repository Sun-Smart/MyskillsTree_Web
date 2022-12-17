import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeelettermanagement } from '../model/hrmsemployeelettermanagement.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeelettermanagementResponse } from '../model/hrmsemployeelettermanagement.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeelettermanagementService {
  formData: hrmsemployeelettermanagement;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeelettermanagement[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeelettermanagements(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeelettermanagement', body);
    }
  }

  saveOrUpdatehrmsemployeelettermanagementsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeelettermanagement', body);
    }
  }

  gethrmsemployeelettermanagementsList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeelettermanagement').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeelettermanagement' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeelettermanagementsByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeelettermanagement' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeelettermanagementsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeelettermanagement' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeelettermanagement(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeelettermanagement' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeelettermanagement')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

