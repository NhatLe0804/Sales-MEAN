/**
 * *** NOTE ON IMPORTING FROM ANGULAR AND NGUNIVERSAL IN THIS FILE ***
 *
 * If your application uses third-party dependencies, you'll need to
 * either use Webpack or the Angular CLI's `bundleDependencies` feature
 * in order to adequately package them for use on the server without a
 * node_modules directory.
 *
 * However, due to the nature of the CLI's `bundleDependencies`, importing
 * Angular in this file will create a different instance of Angular than
 * the version in the compiled application code. This leads to unavoidable
 * conflicts. Therefore, please do not explicitly import from @angular or
 * @nguniversal in this file. You can export any needed resources
 * from your application's main.server.ts file, as seen below with the
 * import for `ngExpressEngine`.
 */
import 'zone.js/dist/zone-node';
const DIST_FOLDER = join(process.cwd(), 'dist/browser');
const domino = require('domino');
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync('./dist/browser/' + 'index.html').toString();
const win = domino.createWindow(template);

win.navigator.language = 'en';
// tslint:disable-next-line:no-string-literal
global['window'] = win;
Object.defineProperty(win.document.body.style, 'transform', {
  value: () => {
    return {
      enumerable: true,
      configurable: true
    };
  },
});
// tslint:disable-next-line:no-string-literal
global['Event'] = null;
// tslint:disable-next-line:no-string-literal
global['document'] = win.document;
// tslint:disable-next-line:no-string-literal
global['CSS'] = null;


import { enableProdMode } from '@angular/core';
import * as express from 'express';
import {join} from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import { ProductRoute } from './server-services/product-route';
const bodyParser = require('body-parser');
const productRoute: ProductRoute = new ProductRoute();
const app = express();
const PORT = process.env.PORT || 4000;


// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP, ngExpressEngine, provideModuleMap} = require('./dist/server/main');


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


mongoose.connect('mongodb://localhost:27017/Sales',
{
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => console.log('Database connected successfully!'))
.catch((err) => console.log(err.message));

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));


productRoute.productRoute(app);

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});
