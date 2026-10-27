
# Amazon UI Testing

This project demonstrates manual and automated user interface testing of Amazon.com.

The project was developed as part of a software testing assignment at LAB University of Applied Sciences.

## Task 1 - Chrome DevTools Testing

Manual testing was performed using Google Chrome DevTools.

Tests included:
- Mobile screen simulation (390 × 844 pixels)
- Network throttling using 3G
- CPU throttling
- Website performance recording
- Manual product search interaction

### Performance Results

- Largest Contentful Paint (LCP): 3.17 seconds
- Interaction to Next Paint (INP): 130 ms
- Cumulative Layout Shift (CLS): 0

## Task 2 - Selenium Automated Testing

Automated browser testing was implemented using JavaScript and Selenium WebDriver.

### Test Cases

| Test ID | Description |
|---------|-------------|
| TC01 | Verify Amazon homepage and search box |
| TC02 | Search for laptops |
| TC03 | Verify laptop product results |
| TC04 | Change the search term to keyboards |

## Technologies

- JavaScript
- Node.js
- Selenium WebDriver
- Google Chrome
- Chrome DevTools
- Visual Studio Code

## Installation

Install the project dependencies:

```bash
npm install
```

## Running the Tests

Run the Selenium tests:

```bash
node selenium-tests/amazon-test.js
```

## Project Structure

- `selenium-tests/` - Automated test code
- `screenshots/task1-devtools/` - Manual testing evidence
- `screenshots/task2-selenium/` - Automated testing evidence
- `report/` - Assignment documentation

## Notes

Amazon is a live website. Test results may vary due to network conditions, website changes and automated traffic restrictions.
