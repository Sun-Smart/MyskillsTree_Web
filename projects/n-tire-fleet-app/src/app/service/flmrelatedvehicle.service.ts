import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flmrelatedvehicle } from '../model/flmrelatedvehicle.model';
import { environment } from '../../environments/environment';
import { IflmrelatedvehicleResponse } from '../model/flmrelatedvehicle.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flmrelatedvehicleService {
  formData: flmrelatedvehicle;
  readonly rootURL = AppConstants.ntirefleetURL;
  list: flmrelatedvehicle[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflmrelatedvehicles() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmrelatedvehicle', body);
    }
  }

  saveOrUpdateflmrelatedvehiclesList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmrelatedvehicle', body);
    }
  }

  getflmrelatedvehiclesList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmrelatedvehicle').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmrelatedvehicle' + '/param/' + key).toPromise();
    }
  }

  getflmrelatedvehiclesByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmrelatedvehicle' + '/' + id).toPromise();
    }
  }

  deleteflmrelatedvehicle(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flmrelatedvehicle' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flmrelatedvehicle')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

