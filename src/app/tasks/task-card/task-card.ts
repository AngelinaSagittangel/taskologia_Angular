import { Component, input, output } from '@angular/core';
import { Task } from '../task';
import { TooltipDirective } from '../../shared/ui/tooltip';
import { TaskDeadlinePipe } from '../task-deadline-pipe';
import { isDeadlineExpired } from '../task-deadline';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-task-card',
  imports: [
    TooltipDirective,
    TaskDeadlinePipe,
    DatePipe,
    NgClass
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss'
})
export class TaskCard {

  task = input.required<Task>();
  isSelected = input(false);

  toggled = output<Task>({ alias: 'toggle' });
  selected = output<Task>({ alias: 'select' });
  protected readonly isDeadlineExpired = isDeadlineExpired;

  // @Input({ required: true }) task!: Task;
  // @Input() isSelected: boolean = false;
  // @Output('delete') deleted = new EventEmitter<number>();
  // @Output('toggle') toggled = new EventEmitter<Task>();
  // @Output('select') selected = new EventEmitter<Task>();

  toggle(event: Event) {
    event.stopPropagation();
    this.toggled.emit(this.task());
  }

  select() {
    this.selected.emit(this.task());
  }
}
