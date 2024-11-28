import { Component } from '@angular/core';
import { AuthFunctionsService } from './services/auth-functions.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'youtube';
  constructor(private authFunctionsService: AuthFunctionsService) {}

  async ngOnInit() {
    // Registra o usuário ao iniciar o app
    await this.authFunctionsService.registerUser();
  }
}
