import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '../services/task.service';
import { Task } from '../task/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  public taskName?: string;
  public tasks$!: Observable<Task[]>;

  constructor(private readonly _tasks: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this._tasks.getTasks();
  }

  public async create() {
    if (!this.taskName?.trim()) return;

    const task = <Task>{
      name: this.taskName.trim(),
      completed: false
    };

    await this._tasks.addTask(task);

    delete this.taskName;
  }

  public async update(task: Task) {
    await this._tasks.updateTask(task);
  }

  public async delete(task: Task) {
    await this._tasks.deleteTask(task);
  }

  public taskTrack(index: number, task: Task): string {
    return task.id!;
  }
}
