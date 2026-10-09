import {
  AfterViewInit,
  Component,
  ElementRef, input,
  OnDestroy,
  OnInit, output,
  ViewChild
} from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-details',
  imports: [],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss',
  host: {
    '(document:keydown.escape)': 'closeDetailsByEscape()'
  }
})
export class TaskDetails implements AfterViewInit, OnDestroy, OnInit {

  task = input.required<Task>();
  closed = output<void>({ alias: 'close' });


  @ViewChild('details') details!: ElementRef<HTMLElement>;

  private openingAnimation?: Animation;
  private translateAnimation = 'translateX';

  ngOnInit() {
    if (window.innerWidth <= 900) {
      this.translateAnimation = 'translateY';
    }
  }

  ngAfterViewInit() {
    this.openingAnimation = this.details.nativeElement.animate([{
      opacity: 0,
      transform: this.translateAnimation + '(200px)'
    }, { opacity: 1, transform: this.translateAnimation + '(0)' }], {
      duration: 200,
      easing: 'ease-out'
    });
  }

  ngOnDestroy() {
    this.openingAnimation?.cancel();
  }

  close() {

    this.openingAnimation = this.details.nativeElement.animate([{
      opacity: 1,
      transform: this.translateAnimation + '(0)'
    }, { opacity: 0, transform: this.translateAnimation + '(200px)' }], {
      duration: 210,
      easing: 'ease-out'
    });

    setTimeout(() => {
      this.closed.emit();
    }, 200);
  }

  highlightPanel() {
    this.details.nativeElement.animate([{ background: 'initial' }, { background: '#554874' }, { background: 'initial' }], {
      duration: 500,
      easing: 'ease'
    });
  }

  closeDetailsByEscape() {
    this.close();
  }
}
