import { Component, OnInit } from '@angular/core';
import { FaqService } from 'src/app/services/faq.service';

@Component({
  selector: 'bt-faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {

  content = "";

  constructor(private faqService: FaqService) { }

  ngOnInit(): void {
    this.faqService.getFaq().subscribe(faq => this.content = faq.content)

  }

}
