import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';
import { AgentService } from '../../agent.service';

@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.css']
})
export class AgentLoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private agentService:AgentService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    if(this.agentService.isLoggedIn()){
      this.router.navigate(['agent']);
    }
  }

  /**
   * Method to Make Sign In API call from Service
   * @returns 
   */
  submit(): void {
    if (!this.loginForm.valid) {
      alert("Invalid Input");
      return;
    }

    // Emitters.spinnerEmitter.emit(true);
    this.agentService.login(this.loginForm.getRawValue()).subscribe(
      (result) => {
        if (result == true) {
          this.router.navigate(['agent'])
        }
        // this.router.navigate(['agent'])
      }
    );

  }
}
