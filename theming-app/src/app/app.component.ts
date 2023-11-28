import { Component, inject } from '@angular/core';
import { ThemeManagerService } from './core/theme-manager.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  themeManager = inject(ThemeManagerService);

  changeTheme(event: MatSelectChange) {
    this.themeManager.switchTheme(event.value);
  }
}
