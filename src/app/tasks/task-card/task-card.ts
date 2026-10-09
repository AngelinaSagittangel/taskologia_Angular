import { Component, input, output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss'
})
export class TaskCard {

  task = input.required<Task>();
  isSelected = input(false);

  toggled = output<Task>({ alias: 'toggle' });
  selected = output<Task>({ alias: 'select' });
  deleted = output<number>({ alias: 'delete' });
  // @Input({ required: true }) task!: Task;
  // @Input() isSelected: boolean = false;
  // @Output('delete') deleted = new EventEmitter<number>();
  // @Output('toggle') toggled = new EventEmitter<Task>();
  // @Output('select') selected = new EventEmitter<Task>();

  toggle(event: Event) {
    event.stopPropagation();
    this.toggled.emit(this.task());
  }

  delete(event: Event) {
    event.stopPropagation();
    this.deleted.emit(this.task().id);
  }

  select() {
    this.selected.emit(this.task());
  }
}
