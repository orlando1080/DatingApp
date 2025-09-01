import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { EditMember, Member, photo } from '../../types/Member';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public member: WritableSignal<Member | null> = signal<Member | null>(null);
  public isEditMode: WritableSignal<boolean> = signal<boolean>(false);
  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = environment.apiUrl;

  getMembers(): Observable<Array<Member>> {
    return this.http.get<Array<Member>>(`${ this.baseUrl }members`)
  }

  getMember(id: string): Observable<Member> {
    return this.http.get<Member>(`${ this.baseUrl }members/${ id }`).pipe(
      tap(member => this.member.set(member))
    )
  }

  getMemberPhotos(id: string): Observable<Array<photo>> {
    return this.http.get<Array<photo>>(`${ this.baseUrl }members/${ id }/photos`)
  }

  updateMember(member: EditMember): Observable<void>  {
    return this.http.put<void>(`${this.baseUrl}members`, member);
  }
}
