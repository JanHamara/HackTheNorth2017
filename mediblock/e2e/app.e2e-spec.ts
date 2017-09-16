import { MediblockPage } from './app.po';

describe('mediblock App', () => {
  let page: MediblockPage;

  beforeEach(() => {
    page = new MediblockPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
