import { Component, ViewEncapsulation } from '@angular/core';
import { AuthFunctionsService } from 'src/app/services/auth-functions.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  userId?: string;
  userName?: string;  
  query?: string;
  searchQuery: string = ''; // Armazena o texto de pesquisa
  videos: any[] = []; // Lista completa de itens do db.json
  filteredItems: any[] = []; // Itens filtrados com base na pesquisa
  isMobileSearchOpen: boolean = false;


  constructor(private authFunctions: AuthFunctionsService, private http: HttpClient) { }


  ngOnInit(): void {
    this.setUserId();
    this.http.get<any[]>('http://localhost:3000/videos').subscribe(data => {
      this.videos = data;
      this.filteredItems = data; // Inicialmente, exibe todos os itens
    });

    this.query = '';

  }

  filterItems() {

    this.query = this.searchQuery.trim().toLowerCase();

    // Se a pesquisa estiver vazia, não exibe resultados e esvazia filteredItems
    if (!this.query) {
      this.filteredItems = [];
    } else {
      // Filtra itens com base na pesquisa
      this.filteredItems = this.videos.filter(item =>
        item.title.toLowerCase().includes(this.query)
      );
    }
  }

  goToLink(link: string) {
    window.open(link, '_blank'); // Abre o link em uma nova aba
  }
  openMobileSearch() {
    this.isMobileSearchOpen = true;
  }

  closeMobileSearch() {
    this.isMobileSearchOpen = false;
  }
  async setUserId(): Promise<void> {
    this.userId = await this.authFunctions.getUserId();
    console.log('User ID:', this.userId);
  }



  collapse: boolean = false;

  OnCollapse() {
    this.collapse = !this.collapse;
  }

}
