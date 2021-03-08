import { browser, by, element, ElementFinder } from 'protractor';
var path = require('path');

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  navigateBack(): Promise<unknown> {
    return browser.navigate().back() as Promise<unknown>;
  }

  applyNow() {
    element(by.tagName('button')).click();
  }



  getPageHeader(): Promise<string> {
    return element(by.tagName('h1')).getText() as Promise<string>;
  }


  fillApplicationForm() {
    let name: ElementFinder = element(by.name('name'))
    let email: ElementFinder = element(by.name('email'))

    name.clear().then(() => {
      name.sendKeys('Praveen');
    });

    email.clear().then(() => {
      email.sendKeys('lala@hjg.co');
    });

    let fileToUpload = '../null.pdf',
      absolutePath = path.resolve(__dirname, fileToUpload);
    element(by.name('resume')).sendKeys(absolutePath);
  }

  getApplicationStatus(): Promise<string> {
    let applyNowButton: ElementFinder = element(by.className('ml-auto')).element(by.tagName('button'))
    applyNowButton.click();
    return element(by.className('success')).getText() as Promise<string>;
  }
}
