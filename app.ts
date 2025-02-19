import createError from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
// @ts-expect-error : no types :(
import sassMiddleware from 'express-dart-sass';
import flash from 'connect-flash';

import dotenv from 'dotenv';

import { engine as exphbs } from 'express-handlebars';
import indexRouter from './src/routes/index.router';

const app = express();
dotenv.config();

app.engine(
    'hbs',
    exphbs({
      extname: '.hbs',
      defaultLayout: false,
      partialsDir: path.join(process.cwd(), '/src/views/partials'),
        helpers : {
            neq: function(valueA: string, valueB: string, options:any) {
                if (valueA !== valueB) {
                    return options.fn(this);
                }
                return options.inverse(this);
            },
            splitAndFormat: function (instructions: string) {
                if (!instructions || typeof instructions !== 'string') {
                    return '';
                }
                const items = instructions.split('|');
                return items
                    .map((item) => `<p>${item.trim()}</p>`)
                    .join('');
            },
        }
    })
  );
// view engine setup
app.set('views', path.join(process.cwd(), 'src/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
    sassMiddleware({
        src: path.join(process.cwd(), 'public'),
        dest: path.join(process.cwd(), 'public'),
        indentedSyntax: false, // true = .sass and false = .scss
        sourceMap: true,
    })
);

app.use(express.static(path.join(process.cwd(), 'public')));
app.use(flash());


app.use('/', indexRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});




export default app;
