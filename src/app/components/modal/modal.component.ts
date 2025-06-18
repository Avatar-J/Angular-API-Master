import { Component, EventEmitter, Output, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output()
  closeModal = new EventEmitter();

  data = inject(DataService);
  route = inject(ActivatedRoute);
  private router = inject(Router);

  onCancelDelete() {
    this.closeModal.emit();
  }
  onDeletePost() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.data.deletePost(id);
    }
    this.closeModal.emit();
    this.router.navigate(['']);
  }
}
