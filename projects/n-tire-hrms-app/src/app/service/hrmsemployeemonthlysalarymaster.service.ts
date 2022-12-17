import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hrmsemployeemonthlysalarymaster } from '../model/hrmsemployeemonthlysalarymaster.model';
import { environment } from '../../environments/environment';
import { IhrmsemployeemonthlysalarymasterResponse } from '../model/hrmsemployeemonthlysalarymaster.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class hrmsemployeemonthlysalarymasterService {
  formData: hrmsemployeemonthlysalarymaster;
  readonly rootURL = AppConstants.ntirehrmsURL;
  list: hrmsemployeemonthlysalarymaster[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatehrmsemployeemonthlysalarymasters(): any {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalarymaster', body);
    }
  }

  saveOrUpdatehrmsemployeemonthlysalarymastersList(): any {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalarymaster', body);
    }
  }

  gethrmsemployeemonthlysalarymastersList(): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalarymaster').toPromise();
    }
  }
  getList(key: string): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalarymaster' + '/param/' + key).toPromise();
    }
  }


  gethrmsemployeemonthlysalarymastersByEID(id: any): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalarymaster' + '/e/' + id).toPromise();
    }
  }
  gethrmsemployeemonthlysalarymastersByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalarymaster' + '/' + id).toPromise();
    }
  }

  deletehrmsemployeemonthlysalarymaster(id: number): any {
    {
      return this.http.delete(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalarymaster' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList(): any {
    {
      this.http.get(AppConstants.ntirehrmsURL + '/hrmsemployeemonthlysalarymaster')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

