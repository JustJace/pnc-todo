import { Component, OnInit } from '@angular/core';
import { Task } from './task/task';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { TaskService } from './services/task.service';
import { filter, mergeMap, switchMap, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public taskName?: string;
  public tasks: Task[] = [];
  public signedInUser$!: Observable<firebase.User | null>;
  public tasks$!: Observable<Task[]>;

  constructor(private readonly _auth: AuthService, private readonly _tasks: TaskService) {}

  ngOnInit(): void {
    this.signedInUser$ = this._auth.signedInUser();
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

    const user = await this._auth.signedInUser()
    .pipe(
      filter(u => !!u),
      take(1)
    ).toPromise();

    await this._tasks.deleteTask(task);
  }

  public async signInWithGoogle(): Promise<void> {
    await this._auth.signInWithGoogle();
  }

  public taskTrack(index: number, task: Task): string {
    return task.id!;
  }
}