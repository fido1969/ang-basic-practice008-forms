import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Event } from '../model/event';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  apiUrl: string = 'http://localhost:3000/list';

  list$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);

  constructor(
    private http: HttpClient, 
    private toastr: ToastrService
  ) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Event[]>(this.apiUrl).subscribe(
      events => this.list$.next(events)
    );
  }

  get(id: number): Observable<Event> {
    return Number(id) === 0 ? of(new Event()) : this.http.get<Event>(`${this.apiUrl}/${Number(id)}`);
  }

  update(event: Event): Observable<Event> {
    return this.http.patch<Event>(
      `${this.apiUrl}/${event.id}`,
      event
    ).pipe(
      tap(() => {
        this.getAll();
        this.toastr.info('The event has been updated.', 'UPDATED');
      })
    );
  }

  create(event: Event): void {
    this.http.post<Event>(
      `${this.apiUrl}`,
      event
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.success('The event has been created.', 'NEW EVENT');
  }

  remove(event: Event): void {
    this.http.delete<Event>(
      `${this.apiUrl}/${event.id}`
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.warning('The event has been deleted.', 'DELETED');
  }
}
