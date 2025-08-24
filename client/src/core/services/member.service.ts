import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Member, photo } from '../../types/Member';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;

  getMembers(): Observable<Array<Member>> {
     return this.http.get<Array<Member>>(`${this.baseUrl}members`)
  }

  getMember(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}members/${id}`)
  }

  getMemberPhotos(id: string): Observable<Array<photo>> {
    return this.http.get<Array<photo>>(`${this.baseUrl}members/${id}/photos`)
  }
}
