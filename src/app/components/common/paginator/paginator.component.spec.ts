import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component['dataSize']=100;
    component['currentPage']=1;
    component['currentPageSize']=10;
    component['pageSizes']=[10,20,30];
    fixture.detectChanges();
  });

  it('should create component and have relevant menthods', () => {
    expect(component).toBeTruthy();
    expect(typeof component['pages']).toEqual("object");
    expect(typeof component['pageSizes']).toEqual("object");
    expect(typeof component['currentPage']).toEqual("number");
    expect(typeof component['currentPageSize']).toEqual("number");
    expect(typeof component['totalPages']).toEqual("number");
    expect(typeof component['dataSize']).toEqual("number");
    expect(typeof component['onPageChanged']).toEqual("object");
    expect(typeof component['pageChanged']).toEqual("function");
    expect(typeof component['resetPages']).toEqual("function");
    expect(typeof component['pageSizeChanged']).toEqual("function");
  });


  it('should show page buttons with page sizes', () => { 
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelectorAll('select').length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('option').length).toBe(3);
    expect(fixture.nativeElement.querySelectorAll('button').length).toBe(10);
  });

  it('should reset page to 1', () => {
    component['resetPages']();
    expect(component['currentPage']).toBe(1);
  });

  it('should change page', () => {
    component['pageChanged'](4);
    expect(component['currentPage']).toEqual(4);
  });

  it('should change page size and reset pages array', () => {
    expect(component['pages']).toEqual([1,2,3,4,5,6,7,8,9,10]);
  });
});
