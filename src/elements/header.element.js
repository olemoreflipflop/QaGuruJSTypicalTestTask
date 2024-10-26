import { test } from '@playwright/test';
import { SearchPopup } from './index';

export class Header {
  constructor(page) {
    this.page = page;
    this.header = this.page.locator('.header');
    this.searchPopup = new SearchPopup(this.page);
    this.searchButton = this.header.getByLabel('Поиск');
  }

  async search(text) {
    await test.step(`Выполнить поиск по подстроке: ${text}`, async () => {
      await this.searchButton.click();
      await this.searchPopup.inputTextAndSubmit(text);
    });
  }
}
