import { AuthorizationService } from './../../../authorization/authorization.service';
import { trigger, transition, animate, state, style } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.scss'],
  animations: [
    trigger('hovered', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0 }))
      ])
    ]),
  ]
})

export class FormPreviewComponent implements OnInit {
  @Input() imageSrc: string;
  @Input() imageAlt: string;
  @Input() title: string;
  @Input() description: string;
  @Input() tinyImageSrc: string;
  @Input() files: string;
  @Input() premium: boolean;
  @Input() url: string;

  hovered;

  // @HostListener('mouseover', ['$event'])
  // handleMouseOver(event: MouseEvent) {
  //   this.hovered = true;
  // }

  // @HostListener('mouseleave', ['$event'])
  // handleMouseLeave(event: MouseEvent) {
  //   this.hovered = false;
  // }

  constructor(private toast: ToastrService, public auth: AuthorizationService) { }

  ngOnInit(): void {
  }

  notLoggedIn() {
    this.toast.warning('You must be logged in to do that!');
  }


  downloadFiles() {
    if (this.files) {
      window.open(this.files, '_blank');
    } else {
      this.toast.error('Sorry the files appear to be missing.');
    }
  }
}
