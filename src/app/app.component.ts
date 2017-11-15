import { Component, OnInit } from '@angular/core';
import { RUN_DIRECTION } from './shared/modules/hm-carousel/component/carousel.component';

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
      image: 'assets/img/slide01.jpg',
      visible: false
    },
    {
      name: '2',
      image: 'assets/img/slide02.jpg',
      visible: false
    }, {
      name: '3',
      image: 'assets/img/slide03.jpg',
      visible: false
    },
    {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
      visible: false
    }, {
      name: '4',
      image: 'assets/img/slide04.jpg',
      visible: false
    },
    {
      name: '5',
      image: 'assets/img/slide05.jpg',
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
  cc(avatar, index) {
    alert(index);
  }
}
