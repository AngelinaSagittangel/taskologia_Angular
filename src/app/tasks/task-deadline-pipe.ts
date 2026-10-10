import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taskDeadline'
})
export class TaskDeadlinePipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) return '';
    const deadlineDate = new Date(value);
    if (isNaN(deadlineDate.getTime())) return '';

    const today = new Date();
    deadlineDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const difference = deadlineDate.getTime() - today.getTime();
    const days = Math.round(difference / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Сегодня';
    if (days === 1) return 'Завтра';
    if (days < 1) return 'Просрочено';

    return `Через ${days} дн.`;
  }
}
