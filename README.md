# ES na palma da mão

> O **[ES NA PALMA DA MÃO](http://www.slideshare.net/rcolnago2/es-na-palma-da-mo-governo-mobile)** é um programa do **Governo do Estado do Espírito Santo** que reúne **iniciativas e serviços do Governo em plataforma móvel (aplicativo) e web, com unidade de experiência do cidadão**. Por meio do **ES NA PALMA DA MÃO**, diversos serviços governamentais podem ser acessados através da web e dispositivos móveis (sistemas operacionais iOS e Android) utilizando uma interface comum.

===============================================================================================================================

**Tabela de Conteúdo**  

- [Principais Tecnologias Utilizadas](#principais-tecnologias-utilizadas)
	- [Typescript](#typescript)
	- [Angular](#angular)
	- [Ionic](#ionic)
	- [Ionic App Scripts](#ionic-app-scripts)
	- [Webpack](#webpack)
 	- [Sass](#sass)
- [Visão Geral](#visão-geral)
   - [Ambiente sandbox de autenticação](#ambiente-sandbox-de-autenticação)
	- [Build System](#build-system)
- [Passo a passo](#passo-a-passo)
	- [Dependências](#dependências)
	- [Instalando](#instalando)
	- [Executando](#executando)

# Principais Tecnologias Utilizadas
Essas são as principais ferramentas, *frameworks* e *libraries* que dão suporte ao projeto:

## [Typescript](https://www.typescriptlang.org/)
TypeScript é uma linguagem para desenvolvimento JavaScript em larga escala. 
Com TypeScript podemos escrever código utilizando uma estrutura fortemente tipada e ter este código compilado para JavaScript puro. 
Nem todas as features do ES2105 já são suportados pelos browsers. TypeScript permite desfrutar de todas as novas características da linguage hoje, 
covertendo código ES2105 em código equivalente em ES5. Qualquer navegador. Qualquer host.

## [Angular](https://angular.io)
Angular é um framework estrutural para aplicações web dinâmicas.

## [Ionic](http://ionicframework.com/)
Ionic é um framework que visa a criação de aplicações híbridas para dispositivos móveis. 

## [Ionic-App-Scripts](https://github.com/ionic-team/ionic-app-scripts)
Scripts de build para projetos ionic usando o webpack como tecnologia subjacente.

## [Webpack](https://webpack.js.org/)
webpack é um empacotador de módulos (javascript e cia) que cria bundles de assets à partir das dependências(assets) 
do projeto.

1. Permite fazer o pré-processamento de arquivos “diferentes” (coffee, es6, ts, sass, less, jade, imagens, etc) que 
os tornam “utilizáveis” através de função require() ou import(ES2015);
2. Possibilidade de carregar dependências sob demanda (code splitting), sem precisar
colocar tudo num grande e pesado bundle.

## [Sass](http://sass-lang.com/)

SASS é uma poderosa extensão da linguagem CSS que permite uma escrita profissional e completa das folhas de estilo de forma muito 
mais dinâmica e produtiva. 

# Visão Geral

## Ambiente sandbox de autenticação
Para acessar a versão completa do ES na palma da mão, é necessário uma conta no *Acesso Cidadão*.

O ES na palma da mão executado a partir do código fonte, bem como o [demo online](http://prodest.github.io/es-na-palma-da-mao-mobile/latest), usam uma versão [*sandbox* do acesso cidadão](https://developers.es.gov.br/acessocidadao), exclusiva para *developers*. 
As contas de usuário criadas no *sandbox* não são válidas no [acesso cidadão real](https://acessocidadao.es.gov.br/), usado pelos cidadãos para acessar os serviços oferecidos pelo Governo do ES.

## Build System
O *build system* do **ES na Palma da Mão** usa yarn scripts, [ionic-app-scripts](https://github.com/ionic-team/ionic-app-scripts) e [webpack](https://webpack.js.org/).

`ionic-app-scripts` usa `webpack` para tratar as seguintes questões:
* Transpila código typescript para ES2015
* Carrega arquivos HTML como módulos
* Transpila .scss em .css e o adiciona ao DOM
* Atualiza o browser e recompila se arquivos são alterados
* Hot module replacement para CSS
* Gera o *bundle* da aplicação
* Carrega todos os módulos

`yarn scripts`:
* Chamadas às todas a tarefas úteis em tempo de desenvolvimento. Encapsula chamadas ao ionic-app-scripts, além de outras. Leia mais [abaixo](#tasks).

# Começando
## Dependências
Ferramentas necessárias para rodar a aplicação:
* `node` and `yarn`

## Instalando
1. `fork` este repositório
2. `clone` o seu fork
3. execute o comando `yarn` para instalar as dependências

## Executando
O **ES na Palma da Mão** usa `ionic-app-scripts` para compilar a aplicação e executar o ambiente de desenvolvimento.
Depois de instaladas todas as dependências, você deve *rodar* a aplicação. O comando `yarn ionic:serve` irá usar
o `webpack` para compilar e gerar um *bundle* a aplicação, *subir* um servidor de desenvolvimento e *escutar* por alterações
em todos os arquivos. A porta default usada é a 8100.
 
