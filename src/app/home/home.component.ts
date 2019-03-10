import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import {MatCardModule} from '@angular/material/card';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loggedIn : boolean = false;
  userData : any = {};
  ordenesCompra : any[];
  institucion: string = "";
  displayedColumns: string[] = ['code','comment','type','accion']

  constructor(private userService: UserService) { }

  ngOnInit() {
    if(this.userService.getCurrentUserToken() )
    {
        this.userService.getCurrentUser().subscribe(
          (successData) =>
          {
              if(successData){
                this.loggedIn = true;
              }
              this.userData = successData.data;
              this.institucion = successData.data.institution_profile[0].institution;
              console.log(this.institucion);

              this.userService.getUserOC().subscribe(

                (ocSuccess) =>
                {
                  this.ordenesCompra = ocSuccess.data.results.filter( (oc) => { return oc.document_type.id == 1  } );
                  console.log(this.ordenesCompra);

                  
                  
                },
                (error) =>
                {

                }

              );
              

          },
          (errorData) =>
          {
            console.log(errorData);
          }
        );
    }
 
  }


  logout()
  {
    this.userService.logout();
    location.reload();
  }

  
}
