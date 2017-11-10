import { Component, ViewEncapsulation } from '@angular/core';
import { RUN_DIRECTION } from '../../directive/carousel.directive';


// if the pane is paned .25, switch to the next pane.
const PANBOUNDARY = 0.25;
@Component({
  selector: 'carousel-container',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselComponent {
  index = 0;
  direction = RUN_DIRECTION.RIGHT;
  disabled;
  enable = false;

  avatars = [
    {
      name: '1',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: '2',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: '3',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: '4',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: '5',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: '6',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    },
  ];

  cdirection() {
    this.direction = this.direction === RUN_DIRECTION.LEFT ? RUN_DIRECTION.RIGHT : RUN_DIRECTION.LEFT;
  }
}
