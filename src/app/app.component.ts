import { Component } from '@angular/core';
import { Task } from './task/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public taskName?: string;
  public tasks: Task[] = [];
  
  public create(): void {
    if (!this.taskName?.trim()) return;

    const task = <Task>{
      name: this.taskName.trim(),
      completed: false
    };
    
    this.tasks.push(task);

    delete this.taskName;
  }

  public delete(task: Task): void {
    const index = this.tasks.indexOf(task, 0);
    if (index >= 0) {
      this.tasks.splice(index, 1);
    }
  }
}