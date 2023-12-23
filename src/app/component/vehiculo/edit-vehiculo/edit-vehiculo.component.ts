import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../service/procesos/proceso.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-vehiculo',
  templateUrl: './edit-vehiculo.component.html',
  styleUrls: ['./edit-vehiculo.component.css']
})

export class EditVehiculoComponent implements OnInit{
  form: FormGroup;
  propietarios: any;
  tipos_vehiculos: any;
  placa: any;

  constructor(
    private proceso: ProcesoService,
    private dialogRef: MatDialogRef<EditVehiculoComponent>,
    private route: ActivatedRoute
  ){
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
    console.log("hola");
    this.get_data_vehiculo();
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

  get_data_vehiculo() {
    this.placa = this.proceso.get_placa()
    console.log(this.placa);
    this.proceso.get_vehiculo_by_placa(this.placa).subscribe(
      (response: any) => {
        this.form.patchValue(response);
        console.log(response);
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

    this.proceso.update_vehiculo(this.placa,data).subscribe(
      (response: any) => {
        this.dialogRef.close();
      }
    );
  }

}
