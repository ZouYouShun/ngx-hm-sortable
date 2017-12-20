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
    console.log($event);
  }

  add() {
    this.viewChange(() => {
      this.list.push(this.list.length + 1);
    });
  }
  delete() {
    this.viewChange(() => {
      this.list.splice(this.list.length - 1, 1);
    });
  }

  viewChange(cb: Function) {
    const tmp = this.enable;
    this.enable = false;
    cb();
    setTimeout(() => {
      this.enable = tmp;
    }, 0);
  }
}
