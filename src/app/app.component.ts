import { Component, OnInit } from '@angular/core';

// if the pane is paned .25, switch to the next pane.
const PANBOUNDARY = 0.25;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  list = [1, 2, 3, 4, 5];
  enable = true;
  constructor() {
  }

  complete($event) {
    alert($event);
  }

}
