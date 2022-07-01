import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { MyServiceService } from '../my-service.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  form!: FormGroup;
  private authenticated = false;
  // loader = false


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: MyServiceService
  ) {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  ngOnInit(): void {
    const token = localStorage.getItem("jwt");
    if (token !== null) {
      this.router.navigate(["/"]);
      return;
    }
  }

  /**
   * Method to Make Sign In API call from Service
   * @returns 
   */
  submit(): void {
    if (!this.form.valid) {
      alert("Invalid Input");
      return;
    }

    // this.loader = true;
    Emitters.spinnerEmitter.emit(true);
    this.service.signInRequest(this.form.getRawValue()).subscribe(
      (result) => {
        if (result == true) {
          Emitters.authEmitter.emit(true);
          this.authenticated = !this.authenticated;
          this.router.navigate(['/'])
        }
        // this.loader = false;
        Emitters.spinnerEmitter.emit(false);
      }
    );

  }

}
