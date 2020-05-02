import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username : string;
  password : string;
  isLoginFailed = false;
  errorMessage : string;
  roles: string[] = [];

  constructor(private router: Router,
    private authenticationService: AuthenticationService, private tokenStorageService: TokenStorageService) { }

  ngOnInit() {
  	
  }
  
   login() {
     alert(this.username)
  	this.authenticationService.authenticate(this.username, this.password).subscribe(
      data => {      
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);

        this.roles = this.tokenStorageService.getUser().roles;
        
      	this.router.navigate([''])
        this.isLoginFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    )
    
  	
  }

}
