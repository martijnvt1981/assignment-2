import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { NavComponent } from './components/nav/nav.component';
import { MainComponent } from './components/main/main.component';



@NgModule({
    declarations: [
        FooterComponent,
        NavComponent,
        MainComponent
    ],
  exports: [
    FooterComponent,
    NavComponent,
    MainComponent
  ],
    imports: [
        CommonModule
    ]
})
export class LayoutModule { }
