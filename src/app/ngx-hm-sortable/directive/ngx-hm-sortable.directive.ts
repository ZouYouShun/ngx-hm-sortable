import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  Output,
  PLATFORM_ID,
} from '@angular/core';
import { Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { onlyOnBrowser } from '../decorator/only-on.browser';
import { elementsFromPoint, insertAfter } from '../ts/element';

enum MOVE_TYPE {
  UP = 'up',
  DOWN = 'down'
}

@Directive({
  selector: '[ngx-hm-sortable]'
})
export class NgxHmSortableDirective implements AfterViewInit, OnDestroy {

  @Input('ngx-hm-sortable') sourceObj;
  @Input('sortable-id') sourceId;

  // default is true
  private _enable = true;
  @Input('sortable-enable')
  set SourceEnable(enable: boolean) {
    if (enable) {
      if (this.uniqueId) { // prevent get elms before ViewInit
        // switch enable, reget all elms and bind Hammer.js
        this.elms = this.setSelectorElm(this._parentELm.nativeElement);
        this.hms = this.bindHammer(this.getMoveSelector(this._parentELm.nativeElement));
      }
    } else {
      this.hms.forEach(hm => {
        hm.destroy();
      });
      this.hms.length = 0;
    }
    this._enable = enable;
  }
  get SourceEnable() {
    return this._enable;
  }

  @Input('elms-selector') elmsSelector: string;
  @Input('move-selector') moveSelector: string;
  @Input('selected-class') selectedClass: string;
  @Input('moving-class') movingClass: any;

  @Output('sort-complete') sortComplete = new EventEmitter();

  private elms;
  private selectNode;
  // store the first select index
  private selectIndex;
  private nowIndex;
  private sort_clone_obj;

  private priAction;
  // use to save all hms data
  private hms: HammerManager[] = [];
  private uniqueId;

  constructor(
    private _parentELm: ElementRef,
    private _renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    @Inject(PLATFORM_ID) private platformId: Object) { }

  @onlyOnBrowser('platformId')
  ngAfterViewInit(): void {
    // console.log(this.SourceEnable);
    this._parentELm.nativeElement.id = this.uniqueId
      = `SortParent${this.sourceId || Math.ceil(Math.random() * 100000000)}`;

    // if init is true, get element and bind hammerJS
    if (this.SourceEnable) {
      this.elms = this.setSelectorElm(this._parentELm.nativeElement);
      this.hms = this.bindHammer(this.getMoveSelector(this._parentELm.nativeElement));
    }
  }

  @onlyOnBrowser('platformId')
  ngOnDestroy() {
    this.hms.forEach(hm => {
      hm.destroy();
    });
  }

  private setSelectorElm(elm) {
    return Array.from(elm.querySelectorAll(`#${this.uniqueId}>${this.elmsSelector}`));
  }

  private getMoveSelector(elm) {
    return elm.querySelectorAll(`#${this.uniqueId}>${this.elmsSelector} ${this.moveSelector}`);
  }

  private bindHammer(elms) {
    return Array.from(elms).map((el: HTMLElement, index: number) => {
      const hm = new Hammer(el);
      // let the pan gesture support all directions.
      // this will block the vertical scrolling on a touch-device while on the element
      hm.get('pan').set({ direction: Hammer.DIRECTION_ALL });

      hm.on('panstart', (event: any) => {
        event.preventDefault();

        this.selectIndex = this.nowIndex = +this.findItemNode(event.target).attributes.index.value;
        // set choiceNode to this start tag
        this.selectNode = this.elms[this.nowIndex];
        // get distance from this tag's origin
        // set this elem style
        this._renderer.setStyle(this.selectNode, 'pointerEvents', 'none');

        // clone a new tag call sort_clone_obj and hidden it
        this.sort_clone_obj =
          this.createMovingTag(event.center,
            Math.abs(this.selectNode.getBoundingClientRect().top - event.center.y));

        this._renderer.addClass(this.selectNode, this.selectedClass);

      });

      hm.on('panmove', (event) => {
        event.preventDefault();

        this._renderer.setStyle(this.sort_clone_obj, 'transform', `translate(0px, ${event.deltaY}px`);

        elementsFromPoint(this.document, event.center.x, event.center.y, (item: HTMLElement) => {
          // console.log(this._parentELm.nativeElement.contains(item));
          return this._parentELm.nativeElement.contains(item);
        }).then((getElm: any) => {
          getElm = this.findItemNode(getElm);
          if (getElm.attributes.index) {
            const toIndex = +getElm.attributes.index.value;
            if (this.nowIndex !== toIndex) {
              if (this.nowIndex > toIndex) {
                this.insertBefore(getElm);
              } else {
                this.insertAfter(getElm);
              }
            } else {
              switch (this.priAction) {
                case MOVE_TYPE.UP:
                  this.insertAfter(getElm);
                  break;
                case MOVE_TYPE.DOWN:
                  this.insertBefore(getElm);
                  break;
              }
            }
            this.nowIndex = toIndex;
          }
        });
      });

      hm.on('panend', (event) => {
        this._renderer.removeClass(this.selectNode, this.selectedClass);
        this._renderer.setStyle(this.selectNode, 'pointerEvents', '');
        this._renderer.removeChild(this.sort_clone_obj.parentNode, this.sort_clone_obj);

        this.elms = this.setSelectorElm(this._parentELm.nativeElement);
        const id = this.elms.indexOf(this.selectNode);

        if (this.selectIndex !== id) {
          const tmp = this.sourceObj[this.selectIndex];
          this.sourceObj.splice(this.selectIndex, 1);
          this.sourceObj.splice(id, 0, tmp);

          this.sortComplete.emit(this.sourceObj);
        }

        // when move complete clear all unuse variable
        this.selectNode = undefined;
        this.sort_clone_obj = undefined;
        this.selectIndex = undefined;
        this.nowIndex = undefined;
        this.priAction = undefined;
      });
      return hm;
    });
  }

  private insertBefore(getElm: any) {
    this.priAction = MOVE_TYPE.UP;
    this._parentELm.nativeElement.insertBefore(this.selectNode, getElm);
  }

  private insertAfter(getElm: any) {
    this.priAction = MOVE_TYPE.DOWN;
    insertAfter(this._renderer, this.selectNode, getElm);
  }

  // clone a new tag call sort_clone_obj and hidden it
  private createMovingTag(position, disY) {
    const clnElm = this.selectNode.cloneNode(true);
    clnElm.id = 'sort_clone_obj';

    this.addStyle(clnElm, {
      top: `${position.y - disY}px`,
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: '3',
    });
    this._renderer.addClass(clnElm, this.movingClass);

    this._parentELm.nativeElement.appendChild(clnElm);
    return clnElm;
  }

  private addStyle(elm, style: any) {
    Object.keys(style).forEach((key) => {
      const value = style[key];
      this._renderer.setStyle(elm, key, value);
    });
  }

  private findItemNode(elm: HTMLElement): any {
    let nowElm = elm;
    while (nowElm.parentElement &&
      nowElm.parentElement.id !== this._parentELm.nativeElement.id) nowElm = nowElm.parentElement;
    return nowElm;
  }

}
