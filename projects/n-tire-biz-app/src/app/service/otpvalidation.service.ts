import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { SessionService } from '../pages/core/services/session.service';
import { AppConstants, DropDownValues } from '../../../../n-tire-biz-app/src/app/shared/helper'


@Injectable({
  providedIn: 'root'
})
export class OtpvalidationService {
otparray:any = [];
  readonly rootURL = AppConstants.baseURL;
  Authorization_token: string;

  constructor(private http: HttpClient, private sessionService: SessionService) { 
    this.Authorization_token = localStorage.getItem('token')
  }

}
