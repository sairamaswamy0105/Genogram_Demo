import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './shared/containers/home/home.component';
import { DetailsComponent } from './shared/containers/details/details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent ,pathMatch:'full'},  
  { path: 'home/:id', component:DetailsComponent } 
];
