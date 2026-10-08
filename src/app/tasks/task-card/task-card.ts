import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-card',
  imports: [],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss'
})
export class TaskCard {

  @Input({ required: true }) task!: Task;
  @Output() deleted = new EventEmitter<number>();
  @Output() toggled = new EventEmitter<Task>();

  toggle() {
    this.toggled.emit(this.task);
  }

  delete() {
    this.deleted.emit(this.task.id);
  }
}
