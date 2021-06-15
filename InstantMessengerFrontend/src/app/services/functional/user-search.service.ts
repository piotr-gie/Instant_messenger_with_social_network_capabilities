import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  searchValue$ = new BehaviorSubject<string>('');
}
