import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';

export const routes: Routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: UserListComponent },
    {
        path: 'user',
        loadComponent: () => import('./components/user-details/user-details.component').then((m) => m.UserDetailsComponent)
    },
    { path: '**', redirectTo: '/users' }
];
