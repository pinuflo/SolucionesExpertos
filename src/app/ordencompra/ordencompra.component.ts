import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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

  constructor(private route: ActivatedRoute, private userService: UserService, private ordenCompraService: OrdenCompraService) { }

  ngOnInit() {
    this.code = this.route.snapshot.paramMap.get("code");
    this.loading = true;

    this.ordenCompraService.getOC(this.code).subscribe(

      (ocSuccess) =>
      {
        this.loading = false;
        if(ocSuccess.count == 1)
        {
           this.ordenCompra = ocSuccess.results[0];
           this.ordenCompraKeys = Object.keys(this.ordenCompra);
           console.log(this.ordenCompra);
        }
      },
      (error) =>
      {
        this.loading = false;
      }

    );


  }

}
