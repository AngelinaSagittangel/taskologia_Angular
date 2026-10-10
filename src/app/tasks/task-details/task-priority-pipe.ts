import { Pipe, PipeTransform } from '@angular/core';
import { TaskPriorityType } from '../task';

@Pipe({
  name: 'taskPriority'
})
export class TaskPriorityPipe implements PipeTransform {
  transform(priority: TaskPriorityType, withPrefix = true, prefix = 'Приоритет: '): string {

    let priorityText: string;

    switch (priority) {
      case 'high':
        priorityText = 'высокий';
        break;
      case 'low':
        priorityText = 'низкий';
        break;
      case 'medium':
        priorityText = 'средний';
        break;
      default:
        return 'Без приоритета';
    }

    return withPrefix ? prefix + priorityText : priorityText;
  }
}
