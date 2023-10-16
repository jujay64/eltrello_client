import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { ColumnInterface } from '../types/column.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { SocketService } from './socket.service';
import { SocketEventsEnum } from '../types/socketEvents.enum';
import { ColumnInputInterface } from '../types/columnInput.interface';

@Injectable()
export class ColumnsService {
    constructor(private http: HttpClient, private socketService: SocketService){}

    getColumns(boardId: string): Observable<ColumnInterface[]>{
        const url = environment.apiUrl + '/boards/' + boardId + '/columns';
        return this.http.get<ColumnInterface[]>(url);
    }

    createColumn(columnInput: ColumnInputInterface) : void {
        this.socketService.emit(SocketEventsEnum.columnsCreate, columnInput);
    }

    deleteColumn(boardId:string, columnId: string): void {
        this.socketService.emit(SocketEventsEnum.columnsDelete, {boardId, columnId});
    }

    updateColumn(boardId:string, columnId: string, fields: {title: string}): void {
        this.socketService.emit(SocketEventsEnum.columnsUpdate, {boardId, columnId, fields});
    }
}