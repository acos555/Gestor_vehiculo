import { Component } from '@angular/core';
import { ProcesoService } from '../../../service/procesos/proceso.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-propietario',
  templateUrl: './create-propietario.component.html',
  styleUrls: ['./create-propietario.component.css']
})
export class CreatePropietarioComponent  {

  form: FormGroup;

  constructor(
    private proceso: ProcesoService,
    private dialogRef: MatDialogRef<CreatePropietarioComponent>,
    private datePipe: DatePipe
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


  onSubmit() {
    const fecha_nacimiento = this.form.get('fecha_nacimiento')?.value;
    const fechaFormateada = fecha_nacimiento ? this.datePipe.transform(fecha_nacimiento, 'yyyy-MM-dd') : null;
      let data : any = {
        identificacion: this.form.get('identificacion')?.value,
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        telefono: this.form.get('telefono')?.value,
        direccion: this.form.get('direccion')?.value,
        email: this.form.get('email')?.value,
        fecha_nacimiento: fechaFormateada,
    }
    this.proceso.create_propietario(data).subscribe(
      (response: any) => {
        console.log(response);
        this.dialogRef.close();
      });
  }
}
