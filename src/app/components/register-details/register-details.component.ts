import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { AuthService } from "../../services/auth.service";
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-register-details',
  templateUrl: './register-details.component.html',
  styleUrls: ['./register-details.component.scss']
})


export class RegisterDetailsComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private apiService:ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkLoggedIn();

    this.registerForm = this.formBuilder.group({
      fullname: new FormControl(null, Validators.required),
   gender: new FormControl(null),
   // date_of_birth:new FormControl(null, Validators.required),
   self_description:new FormControl(null, Validators.required),
   
   telephone: ['', [ Validators.required, Validators.minLength(10), Validators.maxLength(15) ]],
  //  profession:new FormControl(null, Validators.required),
  //  image:new FormControl(null),
    });
  }

  checkLoggedIn(): void {
    if (this.authService.loggedIn()) {
      this.router.navigate(["/"]);
    }
  }

  onRegisterSubmit(): void {
    this.authService.registerUser(this.registerForm.value)
      .subscribe(data => {
        if (data.success == true) {
          this.flashMessagesService.show(data.msg, {cssClass: "alert-success", timeout: 3000});
          this.router.navigate(["/login"]);
        } else {
          this.flashMessagesService.show(data.msg, {cssClass: "alert-danger", timeout: 3000});
        }
      });
  }


  register() {
    if (!this.registerForm.valid) {
    //  this._myservice.submitRegi(this.myForm.value)
      console.log('Invalid form'); return;
          //   this._router.navigate(['/']);  
    }
    
var obj = this.registerForm.value;
obj.email = localStorage.getItem("email");

console.log("send data - "+JSON.stringify(obj))

    var useemail = localStorage.getItem("email")
    console.log("email - "+useemail)
    this.apiService.submitRegi(JSON.stringify(obj))
   // console.log(JSON.stringify(this.registerForm.value));
.subscribe(
  data=>{console.log(data);
    localStorage.removeItem("email")
    this.router.navigate(["/login"]);

    error=>console.error(error)
  }
)  

  }

}
