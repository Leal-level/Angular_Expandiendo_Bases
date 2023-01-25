import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//se importa el componente sidebar
import { SidebarComponent } from './sidebar/sidebar.component';
import { BusquedaComponent } from '../gifs/busqueda/busqueda.component';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  //recordar: se debe exportar el componente para usarlo fuera de este modulo
  exports:[
    SidebarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
