import { test as base, expect } from '@playwright/test';
import { App } from '../src/pages';
import * as allure from 'allure-js-commons';

const test = base.extend({
  app: async ({ page }, use) => {
    const app = new App(page);
    await app.open();
    await use(app);
  },
});

test.beforeAll('', () => {
  allure.epic('Поиск по сайту');
  allure.owner('Olga Leonova');
});

test.describe('Повторный поиск', () => {
  test('Повторное использование поиска через шапку сайта', async ({ app }) => {
    allure.feature('Поиск через шапку сайта');

    let text = 'Пушкин';
    await app.header.search(text);
    let results = await app.searchPage.getResultItems();

    await test.step(`В URL добавлен query параметр = ${text}`, async () => {
      await expect(app.page).toHaveURL(new RegExp(encodeURIComponent(text)));
    });

    await test.step('Результаты поиска соответствуют подстроке', async () => {
      results.forEach((result) => {
        expect(result).toEqual(expect.stringContaining(text));
      });
    });

    text = 'Лермонтов';

    await app.header.search(text);
    results = await app.searchPage.getResultItems();

    await test.step(`В URL добавлен query параметр = ${text}`, async () => {
      await expect(app.page).toHaveURL(new RegExp(encodeURIComponent(text)));
    });

    await test.step('Результаты повторного поиска соответствуют подстроке', async () => {
      results.forEach((result) => {
        expect(result).toEqual(expect.stringContaining(text));
      });
    });
  });

  test('Повторное использование поиска на странице поиска', async ({ app }) => {
    allure.feature('Поиск через страницу поиска');

    let text = 'Пушкин';
    await app.header.search(text);
    let results = await app.searchPage.getResultItems();

    await test.step(`В URL добавлен query параметр = ${text}`, async () => {
      await expect(app.page).toHaveURL(new RegExp(encodeURIComponent(text)));
    });

    await test.step('Результаты поиска соответствуют подстроке', async () => {
      results.forEach((result) => {
        expect(result).toEqual(expect.stringContaining(text));
      });
    });

    text = 'Лермонтов';

    await app.searchPage.search(text);
    results = await app.searchPage.getResultItems();

    await test.step(`В URL добавлен query параметр = ${text}`, async () => {
      await expect(app.page).toHaveURL(new RegExp(encodeURIComponent(text)));
    });

    await test.step('Результаты повторного поиска соответствуют подстроке', async () => {
      results.forEach((result) => {
        expect(result).toEqual(expect.stringContaining(text));
      });
    });
  });
});
