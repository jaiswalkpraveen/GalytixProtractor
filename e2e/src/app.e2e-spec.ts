import { AppPage } from './app.po';
import { browser, logging, by, element, ElementFinder, ElementArrayFinder } from 'protractor';
var jobUrl = 'http://localhost:4200/job/'
var pageHeader = 'BROWSE JOBS'
var applicationStatus = 'Application submitted'

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getPageHeader()).toEqual(`${pageHeader}`)
  });

  it('should have working anchor tag', () => {
    element(by.tagName('ul')).all(by.tagName('li > a')).map(function (link) {
      return link.getAttribute('href');
    }).then(function (links) {
      for (let index = 0; index < links.length; index++) {
        browser.get(`${links[index]}`);
        expect(browser.getCurrentUrl()).toEqual(`${jobUrl + (index + 1)}`);
      }
    });
  });

  it('perform end to end application submission', () => {
    element(by.tagName('ul')).all(by.tagName('li > a'))
      .each((job, index) => {
        if (index === 0)
          if (job != undefined && job.getText != null) {
            expect(browser.getCurrentUrl()).toContain(`${jobUrl.slice(0, -1) + 's'}`);
            expect(page.getPageHeader()).toEqual(`${pageHeader}`)
            job.click()
            expect(browser.getCurrentUrl()).toEqual(`${jobUrl + (index + 1)}`);
            page.applyNow();
            page.fillApplicationForm();
            expect(page.getApplicationStatus()).toEqual(`${applicationStatus}`)
            page.navigateBack()
          }
      });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
