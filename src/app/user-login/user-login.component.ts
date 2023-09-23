import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';



@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
})

export class UserLoginComponent implements OnInit {
  @ViewChild('successMessage') successMessage: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  failure = { value: false };
  userData = null;

  
  /* --login form--- */

  loginForm = this.formBuilder.group({
    userId: [null, [Validators.required]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  ngOnInit(): void {
    this.failure.value = false;
  }

  /* -----method for login------- */

  submit(){
    this.userService.userLogin(this.loginForm.value).subscribe(
      (data) => {
        this.userData = data;
        this.failure.value = false;
        console.log(this.userData.userId);
        localStorage.setItem("userId",this.userData.userId);
        this.router.navigate(["/userHome"]);
        this.showSuccessMessage();
        setTimeout(() => {
          this.router.navigate(["/userHome"]);
        }, 6000); // Delay for 2 seconds (adjust as needed)
      },
      
      (error) => {
        this.failure.value = true;
        this.loginForm.reset();
      }
    );
  }
  // Method to display the success message
showSuccessMessage() {
  this.successMessage.nativeElement.classList.add('show');
  setTimeout(() => {
    this.successMessage.nativeElement.classList.remove('show');
  }, 100000); // Hide the message after 5 seconds (adjust as needed)
}


}
