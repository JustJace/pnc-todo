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

  constructor(public readonly auth: AuthService) {}

  ngOnInit(): void {
  }
}