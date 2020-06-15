import { Component, OnInit } from '@angular/core';
import { FaqService } from 'src/app/services/faq.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'bt-faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {

  faqList = []
  loading = true;

  constructor(private faqService: FaqService
    , private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.faqService.getFaq()
    .subscribe(
      faq => {
          this.loading = false;
          this.faqList = faq
        },
        (erro: HttpErrorResponse) => {
          erro.status == 403
          this.userService.logout()
        }
      )

  }

}
