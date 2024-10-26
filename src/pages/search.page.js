import { test } from '@playwright/test';
import { BasePage } from './base.page';

export class SearchPage extends BasePage {
  constructor(page) {
    super(page);
    this.resultItem = this.page.locator('.result__name');
    this.searchInput = this.page.getByPlaceholder('Что вы ищете?');
  }

  async search(text) {
    await test.step(`Выполнить поиск по подстроке: ${text}`, async () => {
      await this.searchInput.clear();
      await this.searchInput.fill(text);
      await this.page.keyboard.press('Enter');
    });
  }

  async getResultItems() {
    let resultsText = [];
    await test.step(`Получить заголовки результатов поиска`, async () => {
      for (const result of await this.resultItem.all()) {
        const text = await result.textContent();
        resultsText.push(text.trim());
      }
    });
    return resultsText;
  }
}
