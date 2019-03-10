import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  loggedIn : boolean = false;
  user : any = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private userService: UserService) {}


  ngOnInit() {


    if(this.userService.getCurrentUserToken() )
    {

        this.userService.getCurrentUser().subscribe(
          (successData) =>
          {
              if(successData)
              {
                this.loggedIn = true;
                this.user = successData.data.data;
              }
              
              
          },
          (errorData) =>
          {
            //console.log(errorData);
            this.logout();
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
