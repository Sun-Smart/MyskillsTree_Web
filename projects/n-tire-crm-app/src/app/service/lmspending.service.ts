import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lmspending } from '../model/lmspending.model';
import { lmstask } from '../model/lmstask.model';
import { lmsreminder } from '../model/lmsreminder.model';
import { lmshistory } from '../model/lmshistory.model';
import { environment } from '../../environments/environment';
import { IlmspendingResponse } from '../model/lmspending.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../n-tire-bo-app/src/app/shared/helper'
import { SessionService } from '../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
@Injectable({
  providedIn: 'root'
})
export class lmspendingService {
  formData: lmspending;
  readonly rootURL = AppConstants.ntirecrmURL;
  lmstasks: lmstask[] = [];
  lmsreminders: lmsreminder[] = [];
  lmshistories: lmshistory[] = [];
  list: lmspending[];

  constructor(private http: HttpClient, public sessionService: SessionService) { }

  valid() {
    return true;

  }
  saveOrUpdatelmspendings() {
    {
      var body = {
        ...this.formData,
        lmstasks: this.lmstasks.filter(function (el) { return Object.keys(el).length != 0; }),
        lmsreminders: this.lmsreminders.filter(function (el) { return Object.keys(el).length != 0; }),
        lmshistories: this.lmshistories.filter(function (el) { return Object.keys(el).length != 0; }),
      };
      return this.http.post(AppConstants.ntirecrmURL + '/lmspending', body);
    }
  }

  saveOrUpdatelmspendingsList() {
    {
      var body = {
        list: this.list,
      };
      return this.http.post(AppConstants.ntirecrmURL + '/lmspending', body);
    }
  }

  getlmspendingsList() {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/lmspending').toPromise();
    }
  }
  getList(key: string) {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/lmspending' + '/param/' + key).toPromise();
    }
  }

  getlmspendingsByID(id: number): any {
    {
      return this.http.get(AppConstants.ntirecrmURL + '/lmspending' + '/' + id).toPromise();
    }
  }

  deletelmspending(id: number) {
    {
      return this.http.delete(AppConstants.ntirecrmURL + '/lmspending' + '/' + id).toPromise();
    }
  }
  clearList() {
    this.lmstasks = [];
    this.lmsreminders = [];
    this.lmshistories = [];
  }
  refreshList() {
    {
      this.http.get(AppConstants.ntirecrmURL + '/lmspending')
        .toPromise()
        .then((res:any) => this.list = res as any[]);
    }
  }


}

