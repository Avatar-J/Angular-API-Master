import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { APIService } from '../../services/API.service';
import { of } from 'rxjs';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let apiServiceSpy: jasmine.SpyObj<APIService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let routeStub: Partial<ActivatedRoute>;

  beforeEach(() => {
    apiServiceSpy = jasmine.createSpyObj('APIService', ['deletePost']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    routeStub = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('123'),
        },
      },
    };

    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        { provide: APIService, useValue: apiServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: routeStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the modal component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeModal when onCancelDelete is called', () => {
    spyOn(component.closeModal, 'emit');
    component.onCancelDelete();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should call deletePost with @Input() postId and navigate', () => {
    component.postId = '456';
    spyOn(component.closeModal, 'emit');

    component.onDeletePost();

    expect(apiServiceSpy.deletePost).toHaveBeenCalledWith('456');
    expect(component.closeModal.emit).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should fallback to route param id if postId is not set', () => {
    component.postId = '';
    spyOn(component.closeModal, 'emit');

    component.onDeletePost();

    expect(routeStub.snapshot.paramMap.get).toHaveBeenCalledWith('id');
    expect(apiServiceSpy.deletePost).toHaveBeenCalledWith('123');
    expect(component.closeModal.emit).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });

  it('should not call deletePost if id is null', () => {
    (routeStub.snapshot.paramMap.get as jasmine.Spy).and.returnValue(null);
    component.postId = '';
    spyOn(component.closeModal, 'emit');

    component.onDeletePost();

    expect(apiServiceSpy.deletePost).not.toHaveBeenCalled();
    expect(component.closeModal.emit).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
