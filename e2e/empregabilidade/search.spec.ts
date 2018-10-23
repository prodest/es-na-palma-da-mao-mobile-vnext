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
    browser.get('/#/search');
    browser.driver.sleep(1000);
    element(by.name('BuscaEmprego')).element(by.model("query")).sendKeys('ifes');
    browser.driver.sleep(2000);
    /*    
    element.all(by.buttonText('Buscar')).click();
    browser.driver.sleep(2000);
    let titulo: any = element.all(by.className('toolbar-title-md')).first();
    expect(titulo.getText()).toEqual('empregabilidade');*/
  });
});
