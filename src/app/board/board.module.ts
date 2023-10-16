import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './components/board/board.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/services/authGuard.service';
import { BoardService } from './services/board.services';
import { ColumnsService } from '../shared/services/columns.service';
import { TopbarModule } from '../shared/modules/topbar/topbar.module';
import { InlineFormModule } from '../shared/modules/inlineForm/inlineForm.module';
import { TasksService } from '../shared/services/tasks.service';
import { TaskModalComponent } from './components/taskModal/taskModal.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{
    path: 'boards/:boardId',
    component: BoardComponent,
    canActivate: [AuthGuardService],
    children: [
        {
            path: 'tasks/:taskId',
            component: TaskModalComponent
        }
    ]
}];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), TopbarModule, InlineFormModule, ReactiveFormsModule],
    declarations: [BoardComponent, TaskModalComponent],
    providers: [BoardService, ColumnsService, TasksService]
})
export class BoardModule{

}