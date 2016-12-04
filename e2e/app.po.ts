import { browser, element, by } from 'protractor';


export class GfcPage {
    navigateTo() {
        return browser.get('/');
    }

    getTitleText() {
        return element(by.css('.toolbar-title')).getText();
    }
}
