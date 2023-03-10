import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { AppConstants } from '../../shared/helper';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  bouserregistration_Form: FormGroup;
  firstname: any;
  lastname: any;
  emailid: any;
  mobilenumber: any;
  emailvalidation: boolean = false;
  objvalues: any = [];
  type: string;
  category: any;
  drophide: boolean = false;
  submenus: boolean = false;
  showSpinner: boolean = false;

  constructor(private router: Router, private toastr: ToastService, private http: HttpClient, private formBuilder: FormBuilder, private spinner: NgxSpinnerService) {
    this.bouserregistration_Form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      emailid: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      category: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.category = "G";
    this.onItemChange('');
  }
  gotoLogin() {
    this.router.navigate(['login']);
  }
  onItemChange(value) {
    if (value == "provider" || value == "") {
      this.router.navigate(['registernew']);
      this.type = "P";
      this.category = this.category;
    } else if (value == "availer") {
      this.router.navigate(['applicantregister']);

    } else if (value == "enhancer") {
      this.router.navigate(['enhancer']);
      this.type = "E";
      this.category = this.category;
    }
    else if (value == "certifier") {
      this.router.navigate(['certifier']);
      this.type = "C";
      this.category = this.category;
    }
  }

  onSubmit() {
    if (!this.bouserregistration_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the fields");
      return;
    } else {

      let data = {
        pk: null,
        registrationid: null,
        firstname: this.bouserregistration_Form.value.firstname,
        lastname: this.bouserregistration_Form.value.lastname,
        emailid: this.bouserregistration_Form.value.emailid,
        mobilenumber: this.bouserregistration_Form.value.mobilenumber,
        status: null,
        usertype: this.type,
        usercategory: this.bouserregistration_Form.value.category,
        specialcategory: null,
        statusdesc: null
      }
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      this.spinner.show();

      this.showSpinner = true;
      return this.http.post(AppConstants.ntirebizURL + '/bouserregistration', data, {
        headers: options, responseType: 'text'
      }).subscribe((res: any) => {
        this.showSpinner = false;
        if (res == 'Email already exist') {
          this.showSpinner = false;
          this.toastr.addSingle("error", "", "Email already exist");
          return;
        } else if (res == 'Mobilenumber already exist') {
          this.showSpinner = false;
          this.toastr.addSingle("error", "", "Mobile Number already exist");
          return;
        } else {
          this.showSpinner = false;
          this.toastr.addSingle("success", "", "Successfully Registered.Check your mail for the login credentials");
          this.objvalues.push((res as any).bouserregistration)
          this.bouserregistration_Form.reset(this.bouserregistration_Form.value);
          this.bouserregistration_Form.reset();
          this.bouserregistration_Form.markAllAsTouched();
          this.bouserregistration_Form.value.firstname = null;
          this.bouserregistration_Form.value.lastname = null;
          this.bouserregistration_Form.value.emailid = null;
          this.bouserregistration_Form.value.mobilenumber = null;
          this.bouserregistration_Form.value.category = null;
        }
      }, (error: HttpErrorResponse) => {
        console.log(error.error);
        if (error.error == "Email already exist") {
          this.showSpinner = false;
          this.toastr.addSingle("error", "", "Email already exist");
          return;
        } else if (error.error == 'Mobilenumber already exist') {
          this.showSpinner = false;
          this.toastr.addSingle("error", "", "Mobile Number already exist");
          return;
        } else if (error.error == 'Email already existMobilenumber already exist') {
          this.showSpinner = false;
          this.toastr.addSingle("error", "", "Email already existMobilenumber already exist");
          return;
        }
      });

    }



  }

  opendrop(ev: any) {
    if (ev == 'S') {
      this.submenus = true;
    } else {
      this.submenus = false;
    }
  }
  closedrop(data: any) {
    console.log(data)

  }
}
