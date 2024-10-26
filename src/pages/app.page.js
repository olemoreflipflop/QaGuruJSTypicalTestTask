import { Header } from '../elements/index';
import { SearchPage } from './search.page';

export class App {
  constructor(page) {
    this.page = page;
    this.header = new Header(this.page);
    this.searchPopup = new Header(this.page);
    this.searchPage = new SearchPage(this.page);
  }

  async open() {
    await this.page.goto('/');
  }
}
