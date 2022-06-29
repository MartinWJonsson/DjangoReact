import { test, expect } from '@playwright/test';

test.describe("testing the product features", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')
  })

  test('test creating a new Product', async ({ page }) => {
    await expect(page.locator('text=XPeachPeachy25.99$')).toHaveCount(0);

    // Click text=Add new product
    await page.locator('text=Add new product').click();

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

    await expect(page.locator('text=XPeachPeachy25.99$')).toHaveCount(1);
  });

  test('test updating a product by clicking', async ({ page }) => {
    await expect(page.locator('text=XPeachPeachy25.99$')).toHaveCount(1);
    await expect(page.locator('text=XPeachesSeveral Peaches32.01$')).toHaveCount(0);

    // Click text=XPeachPeachy25.99$
    await page.locator('text=XPeachPeachy25.99$').click();

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

    await expect(page.locator('text=XPeachPeachy25.99$')).toHaveCount(0);
    await expect(page.locator('text=XPeachesSeveral Peaches32.01$')).toHaveCount(1);
  });

  test('test updating a product with keyboard', async ({ page }) => {
    await expect(page.locator('text=XPeachesSeveral Peaches32.01$')).toHaveCount(1);
    await expect(page.locator('text=XTomatoesRed and in charge12.99$')).toHaveCount(0);

    // Click text=Peaches >> nth=0
    await page.locator('text=Peaches').first().click();

    // Fill [placeholder="Name"]
    await page.locator('[placeholder="Name"]').fill('Tomatoes');

    // Press Tab
    await page.locator('[placeholder="Name"]').press('Tab');

    // Fill [placeholder="Description"]
    await page.locator('[placeholder="Description"]').fill('Red and in charge');

    // Press Tab
    await page.locator('[placeholder="Description"]').press('Tab');

    // Fill [placeholder="\30 "]
    await page.locator('[placeholder="\\30 "]').fill('12.99');

    // Click text=Submit
    await page.keyboard.press('Enter');

    await expect(page.locator('text=Peaches')).toHaveCount(0);
    await expect(page.locator('text=Tomatoes')).toHaveCount(1);
  });

  test('test deleting a product', async ({ page }) => {
    // Click text=XTomatoesRed and in charge12.99$ >> button
    await expect(page.locator('text=XTomatoesRed and in charge12.99$')).toHaveCount(1);
    await page.locator('text=XTomatoesRed and in charge12.99$ >> button').click();
    await expect(page.locator('text=XTomatoesRed and in charge12.99$')).toHaveCount(0);
  });
})