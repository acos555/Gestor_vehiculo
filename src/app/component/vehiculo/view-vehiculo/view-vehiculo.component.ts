import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../service/procesos/proceso.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-vehiculo',
  templateUrl: './view-vehiculo.component.html',
  styleUrls: ['./view-vehiculo.component.css']
})
export class ViewVehiculoComponent implements OnInit {
  vehiculos: any;
  placa: any;
  tipo: any;
  fields: any[] = []; 

  constructor(private proceso: ProcesoService) {}

  ngOnInit(): void {
    this.get_view_vehiculo();
  }

  initializeFields() {
    this.fields = [
      { name: 'placa', label: 'Placa' },
      { name: 'marca', label: 'Marca' },
      { name: 'vin', label: 'VIN' },
      { name: 'linea', label: 'Línea' },
      { name: 'cilindrada', label: 'Cilindrada' },
      { name: 'color', label: 'Color' },
      { name: 'chasis', label: 'Chasis' },
      { name: 'tipo_vehiculo', label: 'Tipo de Vehículo' },
      { name: 'modelo', label: 'Modelo' },
      { name: 'propietario_identificacion', label: 'Identificación del Propietario' },
    ];
  }

  get_view_vehiculo() {
    this.placa = this.proceso.get_placa();
    let sub1: Subscription = this.proceso.get_vehiculo_by_placa(this.placa).subscribe((view_vehiculo: any) => {
      this.vehiculos = view_vehiculo;
      sub1.unsubscribe();
      let sub2: Subscription = this.proceso.get_tipo_by_id(this.vehiculos.tipo_vehiculo).subscribe((view_tipo: any) => {
        this.tipo = view_tipo.tipo_vehiculo;
        this.initializeFields(); 
        sub2.unsubscribe();
      });
    });
  }
}
