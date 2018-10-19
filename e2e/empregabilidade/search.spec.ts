import { browser, element, by } from 'protractor';

describe('Pagina de detalhes', () => {
  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    let titulo: any = browser.getTitle();
    expect(titulo).toEqual('ES na Palma da Mão');
  });
  it('Testa o search', () => {
    let menu: any = element
      .all(
        by.className(
          'bar-buttons bar-buttons-md bar-button bar-button-md bar-button-default bar-button-default-md bar-button-menutoggle bar-button-menutoggle-md'
        )
      )
      .first();
    menu.click();
    browser.driver.sleep(1000);
    element(by.id('Empregabilidade')).click();
    browser.driver.sleep(1000);
    let input: any = element(by.model('Digite'));
    input.sendKeys('ifes');
    browser.driver.sleep(1000);
    element.all(by.buttonText('Buscar')).click();
    browser.driver.sleep(1000);
    let titulo: any = element.all(by.className('toolbar-title-md')).first();
    expect(titulo.getText()).toEqual('empregabilidade');
    
  });
});
