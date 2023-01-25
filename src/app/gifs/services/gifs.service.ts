import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

// providedIn: root quiere decir que angular esta definiendo y elevando el servicio de manera global
// en nuestra app y asi no llamarlo desde los providers de los modulos

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     : string = 'NrM8ttGj0zsypITtkg02WtGNYKysDPJX'

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'

  private _historial : string [] = [];
  //esta propiedad tiene los ultimos resultados de las busquedad
  public resultados  : Gif[] = [];

  get historial(){
    return [...this._historial]
  }

  //no importan cuantas veces se llame el servicio, el constructor se ejecutara
  //solo 1 vez al iniciarse, porque los servicios trabajan como si fueran singleton
  constructor(private htpp : HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    //forma alternativa
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!); 
    // }
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
  }

  eliminarBusqueda(query:string){
    this._historial.forEach( (item, index) => {
      if(item === query) this._historial.splice(index,1);
    })
  }
  async buscarGifs(query : string = ''){
    
    query = query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query); 
      this._historial = this._historial.splice(0,10)
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    else{
      this.eliminarBusqueda(query);
      this._historial.unshift(query); 
      ;
    }

    const params = new HttpParams()
          .set('apiKey', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    //al cambiarlo por `` se puede usar interpolacion al final con query}
    //esta es una peticion
    //si no se especifica nada en el get, esto quiere decir que es  de tipo generico
    this.htpp.get<SearchGifsResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe((resp) => {
        console.log(resp.data);
        this.resultados = resp.data;
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
      });

  }


}
