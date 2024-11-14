import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '../_models/message';
import { SetPaginatedResponse, SetPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  baseurl = environment.apiUrl;
  private http = inject(HttpClient);
  paginatedResult = signal<PaginatedResult<Message[]> | null>(null);

  getMessages(pageNumber: number, pageSize: number, container: string){
    let params = SetPaginationHeaders(pageNumber, pageSize);
    params = params.append('container', container);
    return this.http.get<Message[]>(this.baseurl + 'messages', {observe: 'response', params}).subscribe({
      next: response => SetPaginatedResponse(response, this.paginatedResult)
    })
  }

  getMessageThread(username : string){
    return this.http.get<Message[]>(this.baseurl +  'messages/thread/' + username);
  }

  sendMessage(username: string, content: string) {
    return this.http.post<Message>(this.baseurl + 'messages', {recipientUsername: username, content} )
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseurl + 'messages/'+ id);
  }
  
}
