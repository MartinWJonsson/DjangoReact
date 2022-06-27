import { test, expect } from '@playwright/test';

test('test creating a new Product', async ({ page }) => {

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  // Click text=Add new product
  await page.locator('text=Add new product').click();

  // Click [placeholder="Name"]
  await page.locator('[placeholder="Name"]').click();

  // Fill [placeholder="Name"]
  await page.locator('[placeholder="Name"]').fill('Peach');

  // Click [placeholder="Description"]
  await page.locator('[placeholder="Description"]').click();

  // Fill [placeholder="Description"]
  await page.locator('[placeholder="Description"]').fill('Peachy');

  // Click [placeholder="\30 "]
  await page.locator('[placeholder="\\30 "]').click();

  // Fill [placeholder="\30 "]
  await page.locator('[placeholder="\\30 "]').fill('25.99');

  // Click text=Submit
  await page.locator('text=Submit').click();

});

test('test updating a product', async ({ page }) => {

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  // Click text=XPeachPeachy25.99$
  await page.locator('text=XPeachPeachy25.99$').click();

  // Click [placeholder="Name"]
  await page.locator('[placeholder="Name"]').click();

  // Fill [placeholder="Name"]
  await page.locator('[placeholder="Name"]').fill('Peaches');

  // Click [placeholder="Description"]
  await page.locator('[placeholder="Description"]').click();

  // Press a with modifiers
  await page.locator('[placeholder="Description"]').press('Meta+a');

  // Fill [placeholder="Description"]
  await page.locator('[placeholder="Description"]').fill('Several Peaches');

  // Click [placeholder="\30 "]
  await page.locator('[placeholder="\\30 "]').click();

  // Fill [placeholder="\30 "]
  await page.locator('[placeholder="\\30 "]').fill('32.01');

  // Click text=Submit
  await page.locator('text=Submit').click();

});

test('test deleting a product', async ({ page }) => {

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  // Click text=XPeachesSeveral Peaches32.01$ >> button
  await page.locator('text=XPeachesSeveral Peaches32.01$ >> button').click();

});