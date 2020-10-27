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
  @Input() imageSrc;
  @Input() imageAlt;
  @Input() title;
  @Input() description;
  @Input() tinyImageSrc;

  hovered;

  @HostListener('mouseover', ['$event'])
  handleMouseOver(event: MouseEvent) {
    this.hovered = true;
  }

  @HostListener('mouseleave', ['$event'])
  handleMouseLeave(event: MouseEvent) {
    this.hovered = false;
  }

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
  }

  notLoggedIn() {
    this.toast.error('You must be logged in to do that!');
  }

}
