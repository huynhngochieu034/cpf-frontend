import { ThemeService } from './../../core/theme-service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-dynamic-theme',
  templateUrl: './dialog-dynamic-theme.component.html',
  styleUrls: ['./dialog-dynamic-theme.component.scss']
})
export class DialogDynamicThemeComponent implements OnInit {
  theme = '';
  constructor(public dialogRef: MatDialogRef<DialogDynamicThemeComponent>, private themeService: ThemeService) {
    this.themeService.themeChange$.subscribe(theme => (this.theme = theme));
    this.themeService.getTheme();
  }

  ngOnInit() {}
}
