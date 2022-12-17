import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeelanguageskill } from '../model/hrmsemployeelanguageskill.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeelanguageskillResponse } from '../model/hrmsemployeelanguageskill.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeelanguageskillService {
  formData: hrmsemployeelanguageskill;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeelanguageskill[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeelanguageskills(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeelanguageskill', body);
    }
  }

  saveOrUpdatehrmsemployeelanguageskillsList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeelanguageskill', body);
    }
  }

  gethrmsemployeelanguageskillsList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeelanguageskill').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeelanguageskill' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeelanguageskillsByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeelanguageskill' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeelanguageskillsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeelanguageskill' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeelanguageskill(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeelanguageskill' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeelanguageskill')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

