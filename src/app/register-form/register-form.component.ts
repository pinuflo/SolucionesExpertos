import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { environment } from '../../environments/environment';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  addressForm = this.fb.group({
    username:  [null, Validators.required],
    firstName: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private fb: FormBuilder, private userService:UserService) {}

  get aliases() {
    return this.addressForm.get('aliases') as FormArray;
  }

  addAlias() {
    this.aliases.push(this.fb.control(''));
  }


  onSubmit() 
  {
    if(this.addressForm.valid)
    {
        this.userService.register(this.addressForm.value.username,this.addressForm.value.password, this.addressForm.value.name, this.addressForm.value.email ).subscribe(
            (success) =>
            {
                console.log(success);
            },
            (error) =>
            {
                console.log(error);
            }

        );
    }
  }
}
