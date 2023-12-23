import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../../../service/procesos/proceso.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-propietario',
  templateUrl: './edit-propietario.component.html',
  styleUrls: ['./edit-propietario.component.css']
})
export class EditPropietarioComponent implements OnInit {

  form: FormGroup;
  propietarioId: number = 0;

  constructor(
    private proceso: ProcesoService,
    private dialogRef: MatDialogRef<EditPropietarioComponent>,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      identificacion: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      fecha_nacimiento: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.get_data_propietario();
  }

  get_data_propietario() {
    this.propietarioId = this.proceso.get_identificacion()
    this.proceso.get_propietario_by_identificacion(this.propietarioId).subscribe(
      (response: any) => {
        this.form.patchValue(response);
    });
  }

  onSubmit() {
    const fecha_nacimiento = this.form.get('fecha_nacimiento')?.value;
    const fechaFormateada = fecha_nacimiento ? this.datePipe.transform(fecha_nacimiento, 'yyyy-MM-dd') : null;

    let data: any = {
      identificacion: this.form.get('identificacion')?.value,
      nombre: this.form.get('nombre')?.value,
      apellido: this.form.get('apellido')?.value,
      telefono: this.form.get('telefono')?.value,
      direccion: this.form.get('direccion')?.value,
      email: this.form.get('email')?.value,
      fecha_nacimiento: fechaFormateada,
    };

    this.proceso.update_propietario(this.propietarioId, data).subscribe(
      (response: any) => {
        this.dialogRef.close();
      });
  }

}
