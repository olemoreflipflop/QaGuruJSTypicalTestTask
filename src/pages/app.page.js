import { BasePage } from './base.page';
import { SearchPage } from './search.page';

export class App extends BasePage {
  constructor(page) {
    super(page);
    this.searchPage = new SearchPage(this.page);
  }

  async open() {
    await this.page.goto('/');
  }
}
