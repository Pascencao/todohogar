import { AppComponent } from './app.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfigComponent } from './config/config.component';
import { DetailsComponent } from './details/details.component';
import { IsLoggedInGuard } from './is-logged-in.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: DashboardComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'auth', children: [
        { path: 'login', component: LoginComponent },
        { path: 'config', component: ConfigComponent, canActivate: [IsLoggedInGuard] }
    ]}
];