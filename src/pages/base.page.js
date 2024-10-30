import { Header } from '../elements/header.element';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.header = new Header(this.page);
  }

  async open(url) {
    await this.page.goto(url);
  }
}
