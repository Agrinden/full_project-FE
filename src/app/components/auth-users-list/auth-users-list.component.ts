import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { Subject, filter, switchMap } from 'rxjs';

import { RegistrDataDTO } from './../../interfaces/registrData.interface';
import { UserService } from 'src/app/services/user/user.service';
import { ConfirmationDialogChoice } from './../../enums/dialog-enums';
import { AuthDataService } from './../../services/user/auth-data.service';

@Component({
    selector: 'app-auth-users-list',
    templateUrl: './auth-users-list.component.html',
    styleUrls: ['./auth-users-list.component.scss'],

    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule
    ]
})
export class AuthUsersListComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() public tableData: RegistrDataDTO[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public displayedColumns: string[];
    public dataSource: MatTableDataSource<RegistrDataDTO>;
    public chooseValue = '';

    private destroy$: Subject<void> = new Subject<void>();

    constructor(private authDataService: AuthDataService, private userService: UserService) {}

    ngOnInit(): void {
        this.initializeTable(this.tableData);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    public deleteUser(id: string): void {
        console.log(id);
        this.userService
            .showConfirmationDialog('Are you sure that you want to delete that account?')
            .pipe(
                filter(value => value === ConfirmationDialogChoice.confirm),
                switchMap(() => this.authDataService.deleteAccount(id))
            )
            .subscribe();
    }

    private initializeTable(tableData: RegistrDataDTO[]): void {
        this.dataSource = new MatTableDataSource(tableData);
        this.displayedColumns = ['name', 'email', 'role', 'delete accaunt'];
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
