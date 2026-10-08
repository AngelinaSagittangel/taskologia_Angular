import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-details',
  imports: [],
  templateUrl: './task-details.html',
  styleUrl: './task-details.scss'
})
export class TaskDetails {
  @Input({ required: true }) task!: Task;
  @Output('close') closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
