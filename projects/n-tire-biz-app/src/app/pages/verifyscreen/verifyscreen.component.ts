import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifyscreen',
  templateUrl: './verifyscreen.component.html',
  styleUrls: ['./verifyscreen.component.scss']
})
export class VerifyscreenComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private router: Router, private fb: FormBuilder) {
    // this.otpForm = this.fb.group({
    //   mobileotp: new FormControl(),
    //   emailotp: new FormControl()
    // });
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
    });
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

clickCOntinue() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
}
  backLogin() {
    this.router.navigate(['login']);
  }
}
