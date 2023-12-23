import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  get_url = "http://localhost:8000/";
  identificacion:number = 0;
  tipo_vehiculo:number = 0;
  placa:string = "";

  getHttpOptions() {
    let access_origin = "*"
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": access_origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
      })
    };
  }

  constructor(private http: HttpClient) { }

  get_datos_propietarios_vehiculos(){
    return this.http.get(this.get_url + 'datos_propietarios_vehiculos', this.getHttpOptions());
  }
  
  get_propietarios(){
    return this.http.get(this.get_url + 'propietarios', this.getHttpOptions());
  }

  get_propietario_by_identificacion(id: number){
    return this.http.get(this.get_url + 'propietarios/' + id, this.getHttpOptions());
  }

  get_vehiculos(){
    return this.http.get(this.get_url + 'vehiculos', this.getHttpOptions());
  }

  get_vehiculo_by_placa(placa: string){
    return this.http.get(this.get_url + 'vehiculos/' + placa, this.getHttpOptions());
  }

  get_vehiculo_by_propietario(id: number){
    return this.http.get(this.get_url + 'vehiculos/propietario/' + id, this.getHttpOptions());
  }

  get_tipo_vehiculo(){
    return this.http.get(this.get_url + 'tipos_vehiculo', this.getHttpOptions());
  }

  get_tipo_by_id(id: number){
    return this.http.get(this.get_url + 'tipos_vehiculo/' + id, this.getHttpOptions());
  }

  create_propietario(data: any){
    return this.http.post(this.get_url + 'propietarios', data, this.getHttpOptions());
  }

  create_vehiculo(data: any){
    return this.http.post(this.get_url + 'vehiculos', data, this.getHttpOptions());
  }

  create_tipo_vehiculo(data: any){
    return this.http.post(this.get_url + 'tipos_vehiculo', data, this.getHttpOptions());
  }

  update_propietario(id: number, data: any){
    return this.http.put(this.get_url + 'propietarios/' + id, data, this.getHttpOptions());
  }

  update_vehiculo_propietario(id: number, data: any){
    return this.http.put(this.get_url + 'vehiculos/propietario/' + id , data, this.getHttpOptions());
  }

  update_tipo_vehiculo(id: number, data: any){
    return this.http.put(this.get_url + 'tipos_vehiculo/' + id , data, this.getHttpOptions());
  }

  update_vehiculo(placa: string, data: any){
    return this.http.put(this.get_url + 'vehiculos/' + placa , data, this.getHttpOptions());
  }

  delete_propietario(id: number){
    return this.http.delete(this.get_url + 'propietarios/' + id, this.getHttpOptions());
  }

  delete_vehiculo(placa: string){
    return this.http.delete(this.get_url + 'vehiculos/' + placa, this.getHttpOptions());
  }

  delete_tipo_vehiculo(id: number){
    return this.http.delete(this.get_url + 'tipos_vehiculo/' + id, this.getHttpOptions());
  }

  delete_vehiculo_by_propietario(id: number){
    return this.http.delete(this.get_url + 'vehiculos/propietario/' + id, this.getHttpOptions());
  }




  set_identificacion(id: number){
    this.identificacion = id;
  }

  get_identificacion(){
    return this.identificacion;
  }

  set_tipo_vehiculo(id: number){
    this.tipo_vehiculo = id;
  }

  get_tipo_vehiculo_id(){
    return this.tipo_vehiculo;
  }

  set_placa(placa: string){
    this.placa = placa;
  }

  get_placa(){
    return this.placa;
  }

}
