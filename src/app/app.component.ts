import { Component, OnInit } from '@angular/core';

import { RUN_DIRECTION } from './shared/directive/carousel.directive';

// if the pane is paned .25, switch to the next pane.
const PANBOUNDARY = 0.25;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  index = 0;
  direction = RUN_DIRECTION.RIGHT;
  disabled;
  enable = true;

  avatars = [
    {
      name: '1',
      image: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: '2',
      image: 'https://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: '3',
      image: 'https://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: '4',
      image: 'https://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: '5',
      image: 'https://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: '6',
      image: 'https://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    },
  ];
  constructor() {
  }


  ngOnInit(): void {
  }


  cdirection() {
    this.direction = this.direction === RUN_DIRECTION.LEFT ? RUN_DIRECTION.RIGHT : RUN_DIRECTION.LEFT;
  }
  cc(avatar) {
    alert(JSON.stringify(avatar));
  }
}
