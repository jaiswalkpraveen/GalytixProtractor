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
    element(by.tagName('ul')).all(by.tagName('li > a'))
      .each((job, index) => {
        if (job != undefined && job.getText != null) {
          job.getAttribute('href').then((jobLink) => {
            expect(jobLink).toEqual(`${jobUrl + (index + 1)}`)
            job.click()
            expect(browser.getCurrentUrl()).toEqual(`${jobUrl + (index + 1)}`);
            page.navigateBack()
            expect(browser.getCurrentUrl()).toContain(`${jobUrl.slice(0, -1) + 's'}`);
            expect(page.getPageHeader()).toEqual(`${pageHeader}`)
          });
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
            element(by.tagName('button')).click()
            page.fillApplicationForm();
            expect(page.getApplicationStatus()).toEqual(`${applicationStatus}`)
            page.navigateBack()
          }
      });
  });



  afterEach(async () => {
    browser.driver.sleep(3000);
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
