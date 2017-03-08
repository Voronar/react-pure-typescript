/**
 * Server entry point
 */
import * as express from 'express';
import * as path from 'path';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';

const webpackConfig: webpack.Configuration = require('../webpack/dev.config');

const app: express.Application = express();
const webpackCompiler: webpack.Compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(webpackCompiler, {
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
}));
app.use(webpackHotMiddleware(webpackCompiler));

// Hack because webpackDevMiddleware does not generate files to disk
app.use('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const filename: string = path.join(webpackConfig.output.path, 'index.html');
  webpackCompiler.outputFileSystem.readFile(filename, (err: express.ErrorRequestHandler, result: express.Response) => {
    if (err) {
      return next(err);
    }

    res.set('content-type', 'text/html');
    res.send(result);
    res.end();
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
