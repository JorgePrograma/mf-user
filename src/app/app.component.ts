import { Component } from '@angular/core';
import { UserRegistrationComponent } from "./features/create/component/user-registration/user-registration.component";

@Component({
  selector: 'app-root',
  imports: [UserRegistrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mf-user';
}
