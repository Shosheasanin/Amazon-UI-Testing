

/**
 * Amazon UI Testing using Selenium WebDriver
 * Author: Shoshe Asanin
 *
 * TC01: Verify homepage search box
 * TC02: Search for laptops
 * TC03: Verify laptop product results
 * TC04: Change search term to keyboards
 */


const { Builder, By, until, Key } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

async function testAmazon() {
  const driver = await new Builder()
    .forBrowser('chrome')
    .build();

  try {
    // Step 1: Open Amazon
    await driver.get('https://www.amazon.com/');

    // Step 2: Find the search box
    const searchBox = await driver.wait(
      until.elementLocated(By.id('twotabsearchtextbox')),
      20000
    );

    // Step 3: Check if it is visible
    if (!(await searchBox.isDisplayed())) {
      throw new Error('Search box is not visible');
    }

    console.log('TC01 PASS - Amazon search box is visible');

    // Step 4: Save a screenshot
    const folder = path.join(
      __dirname, '..', 'screenshots', 'task2-selenium'
    );

    fs.mkdirSync(folder, { recursive: true });

    const image = await driver.takeScreenshot();

    fs.writeFileSync(
      path.join(folder, '01-amazon-homepage.png'),
      image,
      'base64'
    );

    console.log('Screenshot saved successfully');
    
    // TC02 - Search for laptops on Amazon
    console.log('Starting TC02 - Laptop search');

    // Type laptop and press Enter
    await searchBox.sendKeys('laptop', Key.ENTER);

    // Wait until the search results URL appears
    await driver.wait(
      until.urlContains('k=laptop'),
      20000
    );

    // Check that the search box contains laptop
    const resultSearchBox = await driver.wait(
      until.elementLocated(By.id('twotabsearchtextbox')),
      20000
    );

    const searchValue =
      await resultSearchBox.getAttribute('value');

    if (searchValue !== 'laptop') {
      throw new Error('Search term is incorrect');
    }

    console.log('TC02 PASS - Laptop search completed');

    // Save search results screenshot
    const resultImage = await driver.takeScreenshot();

    fs.writeFileSync(
      path.join(folder, '02-laptop-search.png'),
      resultImage,
      'base64'
    );

    console.log('Laptop search screenshot saved');

    
    // TC03 - Verify laptop products are displayed
    console.log('Starting TC03 - Verify product results');

    // Wait for at least one product result
    await driver.wait(
      until.elementLocated(
        By.css('[data-component-type="s-search-result"]')
      ),
      20000
    );

    // Count the product results
    const products = await driver.findElements(
      By.css('[data-component-type="s-search-result"]')
    );

    if (products.length === 0) {
      throw new Error('No laptop products found');
    }

    console.log(
      `TC03 PASS - Found ${products.length} product results`
    );

    // Save screenshot of product results
    const productScreenshot = await driver.takeScreenshot();

    fs.writeFileSync(
      path.join(folder, '04-product-results.png'),
      productScreenshot,
      'base64'
    );

    console.log('Product results screenshot saved');
    
    // TC04 - Change the search term from laptop to keyboard
    console.log('Starting TC04 - Change search term');

    // Find the search box again
    const keyboardSearch = await driver.wait(
      until.elementLocated(By.id('twotabsearchtextbox')),
      20000
    );

    // Remove the old search term
    await keyboardSearch.clear();

    // Type keyboard and press Enter
    await keyboardSearch.sendKeys('keyboard', Key.ENTER);

    // Wait for the keyboard search URL
    await driver.wait(
      until.urlContains('k=keyboard'),
      20000
    );

    // Find the search box on the new results page
    const newSearchBox = await driver.wait(
      until.elementLocated(By.id('twotabsearchtextbox')),
      20000
    );

    // Verify the new search term
    const newSearchValue =
      await newSearchBox.getAttribute('value');

    if (newSearchValue !== 'keyboard') {
      throw new Error('Search term was not updated');
    }

    // Check that product results appear
    await driver.wait(
      until.elementLocated(
        By.css('[data-component-type="s-search-result"]')
      ),
      20000
    );

    const keyboardProducts = await driver.findElements(
      By.css('[data-component-type="s-search-result"]')
    );

    if (keyboardProducts.length === 0) {
      throw new Error('No keyboard products found');
    }

    console.log(
      `TC04 PASS - Found ${keyboardProducts.length} keyboard results`
    );

    // Save a screenshot of keyboard results
    const keyboardImage = await driver.takeScreenshot();

    fs.writeFileSync(
      path.join(folder, '06-keyboard-search.png'),
      keyboardImage,
      'base64'
    );

    console.log('Keyboard search screenshot saved');





  
} catch (error) {
    console.error('TEST FAILED:', error.message);

    // Show the actual URL when the test fails
    console.log('Current URL:', await driver.getCurrentUrl());

    // Capture the browser when the error happens
    const errorScreenshot = await driver.takeScreenshot();

    fs.writeFileSync(
        path.join(
            __dirname,
            '..',
            'screenshots',
            'task2-selenium',
            '03-search-error.png'
        ),
        errorScreenshot,
        'base64'
    );

    console.log('Error screenshot saved');

    process.exitCode = 1;
}

}

testAmazon();
