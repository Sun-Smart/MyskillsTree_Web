import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flmvehicleusage } from '../model/flmvehicleusage.model';
import { environment } from '../../environments/environment';
import { IflmvehicleusageResponse } from '../model/flmvehicleusage.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flmvehicleusageService {
  formData: flmvehicleusage;
  readonly rootURL = AppConstants.ntirefleetURL;
  list: flmvehicleusage[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflmvehicleusages() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmvehicleusage', body);
    }
  }

  saveOrUpdateflmvehicleusagesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmvehicleusage', body);
    }
  }

  getflmvehicleusagesList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmvehicleusage').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmvehicleusage' + '/param/' + key).toPromise();
    }
  }

  getflmvehicleusagesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmvehicleusage' + '/' + id).toPromise();
    }
  }

  deleteflmvehicleusage(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flmvehicleusage' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flmvehicleusage')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

