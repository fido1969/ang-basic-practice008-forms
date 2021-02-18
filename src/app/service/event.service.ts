import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private list: Event[] = [
    {
      id: 1,
      name: 'Angular Connect',
      date: new Date('2036-9-26').toLocaleDateString('en-GB'),
      time: '10am',
      location: { address: '1 London Rd', city: 'London', country: 'England' }
    },
    {
      id: 2,
      name: 'ng-nl',
      date: new Date('2037-4-15').toLocaleDateString('en-GB'),
      time: '9am',
      location: { address: '127 DT ', city: 'Amsterdam', country: 'NL' }
    },
    {
      id: 3,
      name: 'ng-conf 2037',
      date: new Date('2037-4-15').toLocaleDateString('en-GB'),
      time: '9am',
      location: { address: 'The Palatial America Hotel', city: 'Salt Lake City', country: 'USA' }
    },
    {
      id: 4,
      name: 'UN Angular Summit',
      date: new Date('2037-6-10').toLocaleDateString('en-GB'),
      time: '8am',
      location: { address: 'The UN Angular Center', city: 'New York', country: 'USA' }
    },
  ];

  list$: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>(this.list);

  constructor() { }

  getAll(): void {
    this.list$.next(this.list);
  }

  get(id: number): Observable<Event> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;
    const ev: Event | undefined = this.list.find( item => item.id === id );
    if (ev) {
      return of(ev);
    }

    return of(new Event());
  }

  update(event: Event): Observable<Event> {
    const index: number = this.list.findIndex( item => item.id === event.id );
    this.list.splice(index, 1, event);
    this.getAll();
    return of(this.list[index]);
  }
}
