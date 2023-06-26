import { SelectionModel } from "@angular/cdk/collections";
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";

@Component({
  selector: "app-table-select",
  templateUrl: "./table-select.component.html",
  styleUrls: ["./table-select.component.css"],
})
export class TableSelectComponent implements OnInit, AfterViewInit {
  @Input("columns") displayedColumns: string[] = [];
  @Input("titulos") titulos: string[] = [];
  @Input("data") data: any[] = [];
  @Input("filtrado") filtrado: string='';
  selection = new SelectionModel<Paciente>(true, []);
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  tablaLista: boolean = false;
  filtro:string = '';
  miColorVariable = '--mi-color';


  @Output() onEmitSelection = new EventEmitter<any>();
  @Output() onFilter = new EventEmitter<any>();

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.dataSource.data = this.data;  
    if(this.filtrado !== ''){      
      this.filtro = this.filtrado;
      this.dataSource.filter = this.filtro.trim().toLowerCase();
      this.onFilter.emit('');
    }  
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  selectItem(row: Paciente) {
    this.selection.clear();
    this.selection.toggle(row);
    this.onEmitSelection.emit(row);
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  postNewMatTable(){
    this.dataSource.filterPredicate = (data,filter:string) => {
      const accumulator = (currentTerm:any,key:any) => {          
          return this.nestedFilterCheck(currentTerm,data,key);
        
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const tranformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(tranformedFilter) !== -1;
    }
  }

  nestedFilterCheck(search:any,data:any,key:any){
    if(key === 'nombre' || key === 'apellido'){
      if(typeof data[key] === 'object'){
        for(const k in data[key]){               
          search = this.nestedFilterCheck(search,data[key],k);
        }
      }else{
        search += data[key];
      }
    }
    return search;
  }
}
