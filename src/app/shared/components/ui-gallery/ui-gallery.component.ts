import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './ui-gallery.component.html',
  styleUrls: ['./ui-gallery.component.css']
})
export class UiGalleryComponent {

  public SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  private allowSelected = true;

  @Input() toggle = true;
  @Input() currentAvatar = 0;
  @Input() avatars = [
    {
      name: 'kristy',
      image: 'https://de.aorus.com/upload/Downloads/F_20170531143736CxudUM.JPG',
      visible: true,
      loadding: true
    },
    {
      name: 'matthew',
      image: 'http://semantic-ui.com/images/avatar2/large/matthew.png',
      visible: false,
      loadding: true
    },
    {
      name: 'chris',
      image: 'http://semantic-ui.com/images/avatar/large/chris.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    },
    {
      name: 'jenny',
      image: 'http://semantic-ui.com/images/avatar/large/jenny.jpg',
      visible: false,
      loadding: true
    }
  ];

  swipe(currentIndex: number, action = this.SWIPE_ACTION.RIGHT) {
    if (currentIndex > this.avatars.length || currentIndex < 0) {
      return;
    }

    let nextIndex = 0;

    if (action === this.SWIPE_ACTION.RIGHT) {
      const isLast = currentIndex === this.avatars.length - 1;
      nextIndex = isLast ? 0 : currentIndex + 1;
    }

    if (action === this.SWIPE_ACTION.LEFT) {
      const isFirst = currentIndex === 0;
      nextIndex = isFirst ? this.avatars.length - 1 : currentIndex - 1;
    }

    this.avatars[this.currentAvatar].visible = false;
    this.currentAvatar = nextIndex;
    this.avatars[this.currentAvatar].visible = true;
  }

  onPanStart(event: HammerInput, elm: HTMLElement) {
    event.preventDefault();
    // this.startX = this.x;
    // this.startY = this.y;
    elm.classList.add('grabbing');
  }

  onPanMove(event: HammerInput, elm: HTMLElement) {
    event.preventDefault();
    // this.x = event.deltaX;
    // this.y = event.deltaY;
    // elm.style.transform = `translate(${event.deltaX}px, 0px`;

    elm.classList.remove('grab');
    elm.classList.add('grabbing');
  }

  onPanEnd(event: HammerInput, elm) {
    // this._elemRef.nativeElement.style.left = null;
    // this._elemRef.nativeElement.style.top = null;

    elm.classList.remove('grabbing');
    elm.classList.add('grab');
  }

  onSelected(idx) {
    if (this.allowSelected) {
      this.swipe((idx !== 0) ? idx - 1 : 1 , (idx !== 0) ? this.SWIPE_ACTION.RIGHT : this.SWIPE_ACTION.LEFT);
      return;
    }
    this.allowSelected = true;
  }


  prev() {
    if (this.currentAvatar === 0) {
      this.currentAvatar = this.avatars.length - 1;
      return;
    }
    this.currentAvatar--;
  }

  next() {
    if (this.currentAvatar === this.avatars.length - 1) {
      this.currentAvatar = 0;
      return;
    }
    this.currentAvatar++;
  }

}
