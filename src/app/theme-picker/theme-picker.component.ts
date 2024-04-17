import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainService } from '../services/main.service';

@Component({
  selector: 'app-theme-picker',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss'
})
export class ThemePickerComponent implements AfterViewInit {
  @ViewChild('picker') picker!: ElementRef;

  constructor(
    public mainService: MainService,
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.picker.nativeElement.classList.remove('invisible');      
    }, 500);
  }

  saveTheme() {
    localStorage.setItem('selectedTheme', this.mainService.selectedTheme);
  }
}