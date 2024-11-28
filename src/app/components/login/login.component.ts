import { Component } from '@angular/core';

// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: '<button (click)="auth.loginWithRedirect()">Log in</button>',
  // templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // Inject the authentication service into your component through the constructor
  constructor(public auth: AuthService) { }
}

