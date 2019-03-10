import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { OrdenCompraService } from '../services/orden-compra.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-ordencompra',
  templateUrl: './ordencompra.component.html',
  styleUrls: ['./ordencompra.component.scss']
})
export class OrdencompraComponent implements OnInit {

  code: string = "";
  loading: boolean = true;
  ordenCompra:any = {};
  ordenCompraKeys:any = [];
  ocError:string = null;

  constructor(private route: ActivatedRoute, private userService: UserService, private ordenCompraService: OrdenCompraService, private router: Router) { }

  back()
  {
    this.router.navigate(['/']);
  }

  accept(){
    alert("FUNCION NO DISPONIBLE EN PRUEBA");
  }

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get("code");
    this.loading = true;

    this.ordenCompraService.getOC(this.code).subscribe(

      (ocSuccess) =>
      {
        this.loading = false;
        console.log(ocSuccess);
        if(ocSuccess.count == 1)
        {
           this.ordenCompra = ocSuccess.results[0];
           this.ordenCompraKeys = Object.keys(this.ordenCompra);
           console.log(this.ordenCompra);
        }
        else
        {
          this.ocError = "La OC no contiene datos";
        }

      },
      (error) =>
      {
        this.loading = false;
        this.ocError = "Error al cargar la OC";

        console.log(error);
      }

    );


  }

}
