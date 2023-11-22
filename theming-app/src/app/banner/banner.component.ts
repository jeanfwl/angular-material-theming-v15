import { Component, HostBinding, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  host: { class: 'app-banner' },
})
export class BannerComponent {
  @Input() type: ThemePalette = 'primary';
  @HostBinding('class')
  get hostClass() {
    return `${this.type}-banner`;
  }
}
