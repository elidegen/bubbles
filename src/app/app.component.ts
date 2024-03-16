import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainService } from './services/main.service';
import { PopupComponent } from './popup/popup.component';
import { LoaderComponent } from './loader/loader.component';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CommonModule, PopupComponent, LoaderComponent]
})
export class AppComponent {
  constructor(public ms: MainService){

  }
}
