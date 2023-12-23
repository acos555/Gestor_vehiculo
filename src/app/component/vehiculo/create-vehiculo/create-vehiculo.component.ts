import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../service/procesos/proceso.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-vehiculo',
  templateUrl: './create-vehiculo.component.html',
  styleUrls: ['./create-vehiculo.component.css']
})
export class CreateVehiculoComponent implements OnInit {
  form: FormGroup;
  propietarios: any;
  tipos_vehiculos: any;

  constructor(
    private proceso: ProcesoService,
    private dialogRef: MatDialogRef<CreateVehiculoComponent>,
  ) {
    this.form = new FormGroup({
      placa: new FormControl('', Validators.required),
      marca: new FormControl('', Validators.required),
      vin: new FormControl('', Validators.required),
      linea: new FormControl('', Validators.required),
      cilindrada: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      chasis: new FormControl('', Validators.required),
      tipo_vehiculo: new FormControl('', Validators.required), 
      propietario_identificacion: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.get_propietario();
    this.get_tipo_vehiculo();
  }

  get_propietario() {
    let sub: Subscription = this.proceso.get_propietarios().subscribe((propietarios: any) => {
      sub.unsubscribe();
      this.propietarios = propietarios;
    });
  }

  get_tipo_vehiculo() {
    let sub: Subscription = this.proceso.get_tipo_vehiculo().subscribe((tipos_vehiculo: any) => {
      sub.unsubscribe();
      this.tipos_vehiculos = tipos_vehiculo;
    });
  }

  onSubmit() {
    let data: any = {
      placa: this.form.get('placa')?.value,
      marca: this.form.get('marca')?.value,
      vin: this.form.get('vin')?.value,
      linea: this.form.get('linea')?.value,
      cilindrada: this.form.get('cilindrada')?.value,
      color: this.form.get('color')?.value,
      modelo: this.form.get('modelo')?.value,
      chasis: this.form.get('chasis')?.value,
      tipo_vehiculo: this.form.get('tipo_vehiculo')?.value,  
      propietario_identificacion: this.form.get('propietario_identificacion')?.value,
    };

    this.proceso.create_vehiculo(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
      }
    );
  }
}
