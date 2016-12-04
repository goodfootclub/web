import { GfcPage } from './app.po';


describe('gfc App', function() {
    let page: GfcPage;

    beforeEach(() => {
        page = new GfcPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getTitleText()).toEqual('app works!');
    });
});
