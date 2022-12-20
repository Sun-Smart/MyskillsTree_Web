import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verifyscreen',
  templateUrl: './verifyscreen.component.html',
  styleUrls: ['./verifyscreen.component.scss']
})
export class VerifyscreenComponent implements OnInit {
  validation_Form: FormGroup;
  submitted = false;
  sub: any;
  data: any;
  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute,) {
    // this.otpForm = this.fb.group({
    //   mobileotp: new FormControl(),
    //   emailotp: new FormControl()
    // });
  }
  ngOnInit() {
    this.validation_Form = this.fb.group({
      mobileotp: ['', [Validators.required, Validators.email]],
      emailotp: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.sub = this.route.params.subscribe((params:any) => {
      this.data = params;

      console.log(this.data);

      // if(this.){

      // }
    });
}

// convenience getter for easy access to form fields
get f() { return this.validation_Form.controls; }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.validation_Form.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.validation_Form.value))
}
  backLogin() {
    this.router.navigate(['login']);
  }
}
