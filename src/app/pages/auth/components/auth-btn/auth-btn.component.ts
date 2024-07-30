import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-btn',
  standalone: true,
  imports: [NgIf],
  templateUrl: './auth-btn.component.html',
  styleUrl: './auth-btn.component.scss',
})
export class AuthBtnComponent {
  private router = inject(Router);

  @Input() isGithub: boolean = true;
  @Output() onAuth = new EventEmitter<void>();

  onBtnClick() {
    if (this.isGithub) {
      this.onAuth.emit();
    } else {
      this.router.navigate(['/map']);
    }
  }
}
