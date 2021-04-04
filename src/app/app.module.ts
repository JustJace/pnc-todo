import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { TaskComponent } from './task/task.component';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HeaderComponent } from './header/header.component';

const firebaseConfig = {
  apiKey: "AIzaSyDMUaNWe2OFxJbDu4xY4tpyX02C_lwxJ5U",
  authDomain: "pnc-todo.firebaseapp.com",
  projectId: "pnc-todo",
  storageBucket: "pnc-todo.appspot.com",
  messagingSenderId: "232037389528",
  appId: "1:232037389528:web:5bc7e0bdfa37cec586f3ad"
};

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
