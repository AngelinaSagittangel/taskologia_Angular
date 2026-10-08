import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Task } from './tasks/task';
import { FormsModule } from '@angular/forms';
import { TaskCard } from './tasks/task-card/task-card';
import { TaskDetails } from './tasks/task-details/task-details';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    TaskCard,
    TaskDetails
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  taskTitle: string = '';
  selectedTask: Task | null = null;

  tasks: Task[] = [
    { id: 1, title: 'Изучить Angular', completed: true, description: 'Разобраться с основами и декораторами' },
    {
      id: 2,
      title: 'Разобраться с binding',
      completed: false,
      description: ''
    },
    {
      id: 3,
      title: 'Сделать первый мини-проект',
      completed: true,
      description: 'Самостоятельно реализовать первый проект на Angular'
    }
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
      completed: false,
      description: ''
    });
    this.taskTitle = '';
  }

  deleteTask(id: number) {
    if (this.selectedTask && this.selectedTask.id === id) {
      this.selectedTask = null;
    }
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getActiveTasksCount(): number {
    return this.tasks.filter((task) => !task.completed).length;
  }

  clearTaskInput() {
    this.taskTitle = '';
    this.inputElement.nativeElement.focus();
  }

  closeDetails() {
    this.selectedTask = null;
  }

  selectTask(task: Task) {
    this.selectedTask = task;
  }
}
