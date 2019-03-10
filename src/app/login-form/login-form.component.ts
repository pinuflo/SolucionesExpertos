import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent 
{
  addressForm = this.fb.group({
    username:  [null, Validators.required],
    password: [null, Validators.required],
  });

  loginError:any = { status: false, msg: '' }

  constructor(private fb: FormBuilder, 
              private userService:UserService,
              private route: ActivatedRoute,
              private router: Router,
    ) {}

  get aliases() {
    return this.addressForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }

  onSubmit() 
  {
    console.log(this.addressForm.valid);
    if(this.addressForm.valid)
    {
        this.userService.login(this.addressForm.value.username,this.addressForm.value.password).subscribe(
            (data) =>
            {

              if(data.status == true)
              {
                this.router.navigate(['/']);
              }

            },
            (errorData) =>
            {
              this.loginError.status = true;
              if(errorData.error.message.non_field_error)
              {
                this.loginError.msg = errorData.error.message.non_field_error;
              }
              else
              {
                this.loginError.msg = "Hubo un error al procesar los datos. Intente nuevamente";
              }
            }

        );
    }
  }

}
