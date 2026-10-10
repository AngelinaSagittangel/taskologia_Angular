import { Pipe, PipeTransform } from '@angular/core';
import { getDeadlineDaysDifference } from './task-deadline';

@Pipe({
  name: 'taskDeadline'
})
export class TaskDeadlinePipe implements PipeTransform {
  transform(value: string | null): string {

    const days = getDeadlineDaysDifference(value);

    if (days === null) return '';
    if (days === 0) return 'Сегодня';
    if (days === 1) return 'Завтра';
    if (days < 1) return 'Просрочено';

    return `Через ${days} дн.`;
  }
}
