import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flmassignment } from '../model/flmassignment.model';
import { environment } from '../../environments/environment';
import { IflmassignmentResponse } from '../model/flmassignment.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class flmassignmentService {
  formData: flmassignment;
  readonly rootURL = AppConstants.ntirefleetURL;
  list: flmassignment[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdateflmassignments() {
    {
      var body = {
        ...this.formData,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmassignment', body);
    }
  }

  saveOrUpdateflmassignmentsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirefleetURL + '/flmassignment', body);
    }
  }

  getflmassignmentsList() {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmassignment').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmassignment' + '/param/' + key).toPromise();
    }
  }

  getflmassignmentsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirefleetURL + '/flmassignment' + '/' + id).toPromise();
    }
  }

  deleteflmassignment(id: number) {
    {
      return this.http.delete(AppConstants.ntirefleetURL + '/flmassignment' + '/' + id).toPromise();
    }
  }
  clearList() {
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirefleetURL + '/flmassignment')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

