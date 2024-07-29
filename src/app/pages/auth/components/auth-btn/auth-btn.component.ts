import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-auth-btn',
  standalone: true,
  imports: [],
  templateUrl: './auth-btn.component.html',
  styleUrl: './auth-btn.component.scss',
})
export class AuthBtnComponent {
  @Output() onAuth = new EventEmitter<void>();
}
