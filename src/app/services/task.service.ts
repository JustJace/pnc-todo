import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../task/task';
import { filter, switchMap } from 'rxjs/operators';
import { DocumentReference } from '@angular/fire/firestore';
import { FirestoreCollectionService } from './firestore-collection.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly path: string = 'tasks';

  constructor(private readonly _fsCollection: FirestoreCollectionService) { }

  public observeTasks(): Observable<Task[]> {
    return this._fsCollection.observe(this.path, ref => ref.orderBy('created'));
  }

  public addTask(task: Task): Promise<DocumentReference<Task> | void> {
    return this._fsCollection.insert(this.path, task);
  }

  public updateTask(task: Task): Promise<void> {
    return this._fsCollection.update(this.path, task);
  }

  public deleteTask(task: Task): Promise<void> {
    return this._fsCollection.delete(this.path, task);
  }
}
