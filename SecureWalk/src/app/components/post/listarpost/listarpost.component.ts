import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterLink } from '@angular/router';
import { Post } from '../../../models/post';
import { PostService } from '../../../services/post.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarpost',
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    CommonModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  templateUrl: './listarpost.component.html',
  styleUrl: './listarpost.component.css'
})
export class ListarpostComponent {
  posts: Post[] = []
    
  constructor(private pS: PostService) {
   }
  ngOnInit(): void {
    this.pS.list().subscribe((data) => {
      this.posts = data;
    });
    this.pS.getList().subscribe((data) => {
      this.posts = data;
    });
  }
  eliminar(id: number) {
    this.pS.deleteS(id).subscribe((data) => {
      this.pS.list().subscribe((data) => {
        this.pS.setList(data);
      });
    });
  }
}
