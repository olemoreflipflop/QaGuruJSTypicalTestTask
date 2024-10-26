import { test } from '@playwright/test';

export class SearchPopup {
  constructor(page) {
    this.page = page;
    this.popup = this.page.locator('.popup');
    this.searchInput = this.popup.getByPlaceholder('Что вы ищете?');
    this.searchButton = this.popup.getByLabel('Поиск');
    this.searchSuggestions = this.popup.getByRole('listitem');
  }

  async inputTextAndSubmit(text) {
    await test.step(`Ввести ${text} в строку поиска и перейти к результатам`, async () => {
      await this.searchInput.focus();
      await this.searchInput.fill(text);
      await this.searchButton.click();
    });
  }
}
