import { Component, computed, ElementRef, signal, ViewChild } from '@angular/core';
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
  @ViewChild(TaskDetails) taskDetails?: TaskDetails;

  taskTitle = signal('');
  selectedTask = signal<Task | null>(null);

  tasks = signal<Task[]>([
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
  ]);

  activeTasksCount = computed(() =>
    this.tasks().filter((task) => !task.completed).length
  );


  toggleTask(taskToToggle: Task) {
    this.tasks.update(tasks => tasks.map(task => task.id === taskToToggle.id ? {
      ...task,
      completed: !task.completed
    } : task));

    if (this.selectedTask()?.id === taskToToggle.id) {
      const updatedTask = this.tasks().find(task => task.id === taskToToggle.id) || null;
      this.selectedTask.set(updatedTask);
    }
  }

  addTask() {
    const task = this.taskTitle().trim();

    if (!task) {
      this.inputElement.nativeElement.focus();
      return;
    }

    const tasks = this.tasks();
    const lastTask = tasks[tasks.length - 1];

    const newTask: Task = {
      id: lastTask ? lastTask.id + 1 : 1,
      title: task,
      completed: false,
      description: ''
    };

    this.tasks.update(currentTask => [...currentTask, newTask]);

    this.taskTitle.set('');
  }

  deleteTask(id: number) {
    if (this.selectedTask()?.id === id) {
      this.selectedTask.set(null);
    }
    this.tasks.update(tasks => tasks.filter((task) => task.id !== id));
  }

  clearTaskInput() {
    this.taskTitle.set('');
    this.inputElement.nativeElement.focus();
  }

  closeDetails() {
    this.selectedTask.set(null);
  }

  selectTask(task: Task) {
    if (this.selectedTask()?.id === task.id) {
      this.taskDetails?.highlightPanel();
    } else {
      this.selectedTask.set(task);
    }

  }
}
