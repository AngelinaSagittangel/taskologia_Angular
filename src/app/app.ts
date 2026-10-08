import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Task } from './tasks/task';
import { FormsModule } from '@angular/forms';
import { TaskCard } from './tasks/task-card/task-card';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    TaskCard
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  taskTitle: string = '';

  tasks: Task[] = [
    { id: 1, title: 'Изучить Angular', completed: true },
    { id: 2, title: 'Разобраться с binding', completed: false },
    { id: 3, title: 'Сделать первый мини-проект', completed: true }
  ];

  toggleTask(task: Task) {
    task.completed = !task.completed;
  }

  addTask() {
    const task = this.taskTitle.trim();

    if (!task) {
      this.inputElement.nativeElement.focus();
      return;
    }
    this.tasks.push({
      id: this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1,
      title: task,
      completed: false
    });
    this.taskTitle = '';
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getActiveTasksCount(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }

  clearTaskInput() {
    this.taskTitle = '';
    this.inputElement.nativeElement.focus();
  }
}
