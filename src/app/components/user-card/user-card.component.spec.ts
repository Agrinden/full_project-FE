import { UsersDTO } from './../../interfaces/usersDTO.interface';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserCardComponent } from './user-card.component';
import { isEmpty } from 'rxjs';

const mockUser: UsersDTO = {
    surName: 'Petrov',
    _id: '123'
};

describe('UserCardComponent', () => {
    let component: UserCardComponent;
    let fixture: ComponentFixture<UserCardComponent>;

    beforeAll(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [UserCardComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(UserCardComponent);
        component = fixture.componentInstance;
        component.user = mockUser;
    });

    it('Should be created', () => {
        expect(component).toBeTruthy();
    });

    it('Isedit has been changed when ToggleEdit has been called', () => {
        component.isEdit = true;
        component.toggleEdit();
        expect(component.isEdit).toBeFalse();
    });

    it('UpdateData() should call toggleEdit() and emit updateEvent when UpdateData has been called', () => {
        spyOn(component, 'toggleEdit');
        spyOn(component.updateEvent, 'emit');
        component.updateData();
        expect(component.toggleEdit).toHaveBeenCalledTimes(1);
        expect(component.updateEvent.emit).toHaveBeenCalledOnceWith(component.user);
    });

    it('DeleteData() should emit deleteEvent()', () => {
        spyOn(component.deleteEvent, 'emit');
        component.deleteData();
        expect(component.deleteEvent.emit).toHaveBeenCalledOnceWith(component.user._id);
    });
});
