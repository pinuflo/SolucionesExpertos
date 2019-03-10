import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 

  }

  getCurrentUserToken() : string
  {
      let currentUserToken = JSON.parse(localStorage.getItem(environment.env_key + 'currentUserToken'));
      if(currentUserToken)
      {
          return currentUserToken;
      }
      else
      {
          return null;
      }
  }
  

  getCurrentUser() : Observable<any>
  {
      return this.http.get<any>(`${environment.backend_url}/api/v1/users/me`);
  }

  register(username: string, password: string, name: string, email: string) {
        
    let trimmedEmail = email.trim();

    return this.http.post<any>(`${environment.backend_url}/api/registration/`, { 'username': username, 'password': password, 'name': name, 'email': trimmedEmail })
        .pipe(map(serverResponse => 
            {
              console.log("..Registrando paso2");
                if(!("success" in serverResponse))
                {
                  console.error("Server incompatible, no ha retornado respuesta correcta");
                  return null
                }
                  
                if(serverResponse.success == true)
                {
                    let data = serverResponse.data;
                    if (data && data.token) 
                    {
                        localStorage.setItem(environment.env_key + 'currentUserToken', JSON.stringify(data));
                    }
                    return serverResponse;
                }
                else
                {
                    return serverResponse;
                }


            })
        );
  }

  getUserOC() 
  { 
    return this.http.get<any>(`${environment.backend_url}/api/v1/document`);
  }

  

  login(username: string, password: string) {

    return this.http.post<any>(`${environment.backend_url}/login/`, { username, password })
        .pipe(map(serverResponse => 
            {
                console.log(serverResponse);
                if(serverResponse.status == true)
                {
                    let data = serverResponse.data;
                    if (data && data.token) 
                    {
                        console.log(data.token);
                        localStorage.setItem(environment.env_key + 'currentUserToken', JSON.stringify(data.token));
                    }
                    return serverResponse;
                }
                else
                {
                    return serverResponse;
                }
            })
        );
  }

  logout() 
  {
    localStorage.removeItem(environment.env_key + 'currentUserToken');
  }

}
