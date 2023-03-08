import { Component, Input, OnInit } from '@angular/core';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  @Input('ruta') ruta:string='';

  constructor(private pdfService: NgxExtendedPdfViewerService) { }

  ngOnInit(): void {
  }

}
