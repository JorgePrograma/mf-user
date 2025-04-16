import { Routes } from '@angular/router';
import { UserRegistrationComponent } from './features/create/component/user-registration/user-registration.component';

export const routes: Routes = [
  {
    path: 'user',
    component: UserRegistrationComponent,
    children: [
      { path: 'create', loadChildren: () => import('./features/create/component/user-registration/user-registration.component').then(m => m.UserRegistrationComponent) },
      { path: 'list', loadChildren: () => import('./features/list/component/list/list.component').then(m => m.ListComponent) },
    ]
  },
  { path: '', redirectTo: 'user', pathMatch: 'full' }
];
