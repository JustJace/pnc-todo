import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../task/task';
import { filter, map, tap, switchMap } from 'rxjs/operators';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private readonly _fs: AngularFirestore, private readonly fireAuth: AngularFireAuth) { }

  public async addTask(task: Task): Promise<DocumentReference<Task> | void> {
    const user = await this.fireAuth.currentUser;
    if (!user) return Promise.resolve();

    task.created = new Date();

    const collection = this._fs.collection<Task>(`users/${user!.uid}/tasks`);
    return collection.add(task);
  }

  public getTasks(): Observable<Task[]> {
    return this.fireAuth.authState.pipe(
      filter(u => !!u),
      switchMap(u => {
        const collection = this._fs.collection<Task>(`users/${u!.uid}/tasks`, ref => ref.orderBy('created'));
        return collection.snapshotChanges().pipe(
          map(documents => documents.map(d => {
            const task = d.payload.doc.data();
            task.id = d.payload.doc.id;
            return task;
          }))
        );
      })
    );
  }

  public async updateTask(task: Task): Promise<void> {
    const user = await this.fireAuth.currentUser;
    if (!user) return Promise.resolve();

    const document = this._fs.doc(`users/${user.uid}/tasks/${task.id}`);
    const patch: Partial<Task> = {
      completed: task.completed
    };
    return document.update(patch);
  }

  public async deleteTask(task: Task): Promise<void> {
    const user = await this.fireAuth.currentUser;
    if (!user) return Promise.resolve();

    const document = this._fs.doc(`users/${user.uid}/tasks/${task.id}`);
    return document.delete();
  }
}
