import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentData, DocumentReference, QueryFn } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';

type Identifiable = { id?: string };
type Auditable = { created?: Date };

@Injectable({
  providedIn: 'root'
})
export class FirestoreCollectionService {

  constructor(private readonly _fs: AngularFirestore, private readonly _fsAuth: AngularFireAuth) { }

  public collectionPath = (user: firebase.User, resource: string) => `users/${user.uid}/${resource}`;

  public observe<T extends Identifiable>(path: string, fn?: QueryFn<DocumentData>): Observable<T[]> {
    return this._fsAuth.authState.pipe(
      filter(u => !!u),
      switchMap(u => this.switchPathForCollection<T>(`${this.collectionPath(u!, path)}`, fn))
    );
  }

  private switchPathForCollection<T extends Identifiable>(path: string, fn?: QueryFn<DocumentData>): Observable<T[]> {
    return this._fs
      .collection<T>(path, fn)
      .snapshotChanges()
      .pipe(
        map(documents => documents.map(d => {
          const t = d.payload.doc.data();
          t.id = d.payload.doc.id;
          return t;
        }))
      );
  }

  public async insert<T extends Auditable>(resourcePath: string, t: T): Promise<DocumentReference<T> | void> {
    const user = await this._fsAuth.currentUser;
    if (!user) return Promise.resolve();

    t.created = new Date();
    const path = `${this.collectionPath(user, resourcePath)}`;
    return this._fs.collection<T>(path).add(t);
  }

  public async update<T extends Identifiable>(resourcePath: string, t: Partial<T>): Promise<void> {
    const user = await this._fsAuth.currentUser;
    if (!user) return Promise.resolve();

    const path = `${this.collectionPath(user, resourcePath)}/${t.id}`;
    return this._fs.doc<T>(path).update(t);
  }

  public async delete<T extends Identifiable>(resourcePath: string, t: Partial<T>): Promise<void> {
    const user = await this._fsAuth.currentUser;
    if (!user) return Promise.resolve();

    const path = `${this.collectionPath(user, resourcePath)}/${t.id}`;
    return this._fs.doc<T>(path).delete();
  }
}