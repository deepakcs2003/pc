import { Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { HomePageComponent } from './home-page/home-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path : "user_form_add",
        component : UserFormComponent
    }
];
