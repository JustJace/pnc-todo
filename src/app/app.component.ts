import { Component } from '@angular/core';
import { Task } from './task/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public taskName?: string;
  public tasks: {[name:string] : Task} = {};
  
  public create(): void {
    if (!this.taskName?.trim()) return;

    const task = <Task>{
      name: this.taskName.trim(),
      completed: false
    };

    if (this.tasks[task.name]) return;

    this.tasks[task.name] = task;
    delete this.taskName;
  }

  public delete(task: Task): void {
    delete this.tasks[task.name];
  }
}