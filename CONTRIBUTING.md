
# Código de Conduta para Colaboradores


> O **[ES NA PALMA DA MÃO](http://www.slideshare.net/rcolnago2/es-na-palma-da-mo-governo-mobile)** é um programa do **Governo do Estado do Espírito Santo** que reúne **iniciativas e serviços do Governo em plataforma móvel (aplicativo) e web, com unidade de experiência do cidadão**. Por meio do **ES NA PALMA DA MÃO**, diversos serviços governamentais podem ser acessados através da web e dispositivos móveis (sistemas operacionais iOS e Android) utilizando uma interface comum.

==================================================================================================================================================================

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

## Nossas responsibilidades

Os administradores do projeto são responsáveis por esclarecer os padrões de
comportamento e deverão tomar ação corretiva apropriada e justa em resposta
a qualquer instância de comportamento inaceitável.

Os administradores do projeto têm o direito e a responsabilidade de
remover, editar ou rejeitar comentários, commits, código, edições
na wiki, erros ou outras formas de contribuição que não estejam de
acordo com este Código de Conduta, bem como banir temporariamente ou
permanentemente qualquer colaborador por qualquer outro comportamento
que se considere impróprio, perigoso, ofensivo ou problemático.

## Aplicação

### Visão Geral

#### Build System
O *build system* do **ES na Palma da Mão** usa o npm, [ionic-app-scripts](https://github.com/ionic-team/ionic-app-scripts) e [webpack](https://webpack.js.org/).

`ionic-app-scripts` usa `webpack` para tratar as seguintes questões:
* Transpila código typescript para ES2015
* Carrega arquivos HTML como módulos
* Transpila .scss em .css e o adiciona ao DOM
* Atualiza o browser e recompila se arquivos são alterados
* Hot module replacement para CSS
* Gera o *bundle* da aplicação
* Carrega todos os módulos

`npm`:
* Chamadas às todas a tarefas úteis em tempo de desenvolvimento. Encapsula chamadas ao ionic-app-scripts, além de outras.

#### Dependências
Ferramentas necessárias para rodar a aplicação:
* `node + npm` versão LTS: [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
* ionic: `npm i -g ionic`
* cordova: `npm i -g cordova`

obs: o ionic e o cordova são instalados no escopo global (-g).

#### Instalando
1. `fork` este repositório pelo GitHub
2. clone o seu fork: `git clone <url-github-fork>`
3. acesse o diretorio criado: `cd es-na-palma-da-mao-mobile-vnext`
4. instale as dependências da aplicação: `npm install`
5. renomeie o arquivo '.env.example' para '.env': `cp .env.example .env`

#### Executando
O **ES na Palma da Mão** usa `ionic-app-scripts` para compilar a aplicação e executar o ambiente de desenvolvimento.
Depois de instaladas todas as dependências, você deve *rodar* a aplicação. O comando `ionic serve`. Isso irá
iniciar o build utilizando o ionic, vai gerar um *bundle* da aplicação, *subir* um servidor de desenvolvimento e *escutar* por alterações em todos os arquivos. 

Por padrão a aplicação será servida em http://localhost:3000.

#### Executando no dispovitivo móvel para teste

Com o celular plugado no PC e reconhecido pelo sistema.

1. `npm run build:android`
2. `cordova platform add android@7.1.1`
3. `cordova prepare android -f`
4. `cordova run android`
