import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthGuard } from './guard/auth.guard';
import { OrdencompraComponent as OrdenCompraComponent } from './ordencompra/ordencompra.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: HomeComponent,
    },
    {
      path: 'login',
      component: LoginFormComponent,
    },
    {
      path: 'register',
      component: RegisterFormComponent,
    },
    {
      path: 'oc/:code',
      canActivate: [AuthGuard],
      component: OrdenCompraComponent,
    }    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
