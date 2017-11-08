import { DragScrollDirective } from './shared/directive/drag-scroll/drag-scroll.directive';
import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  hideScrollbar;
  disabled;
  xDisabled;
  yDisabled;
  imagelist = [
    'luke.png',
    'chubaka.png',
    'boba.png',
    'c3po.png',
    'leia.png',
    'obi.png',
    'r2d2.png',
    'storm.png',
    'varder.png',
    'yoda.png',
    'yolo.png'
  ];


  avatars = [
    {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    }, {
      name: 'kristy',
      image: 'http://semantic-ui.com/images/avatar2/large/kristy.png',
      visible: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false
    },
  ];

  leftNavDisabled = false;
  rightNavDisabled = false;

  dragScrollDom: any;
  dragScrollRef: ElementRef;
  dragScroll: DragScrollDirective;

  @ViewChild('nav', { read: DragScrollDirective }) ds: DragScrollDirective;

  constructor(
    matIconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    matIconRegistry
      .addSvgIcon('github',
      sanitizer.bypassSecurityTrustResourceUrl('/assets/img/github.svg'))
      .registerFontClassAlias('fontawesome', 'fa');
  }


  ngOnInit() {
  }

  go() {
    console.log('click');
  }

  clickItem(item) {
    console.log('itmen clicked');
  }

  remove() {
    this.imagelist.pop();
  }

  toggleHideSB() {
    this.hideScrollbar = !this.hideScrollbar;
  }

  toggleDisable() {
    this.disabled = !this.disabled;
  }
  toggleXDisable() {
    this.xDisabled = !this.xDisabled;
  }
  toggleYDisable() {
    this.yDisabled = !this.yDisabled;
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  moveRight() {
    this.ds.moveRight();
  }

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  }

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  }
}
