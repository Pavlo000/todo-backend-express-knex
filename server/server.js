const app = require('./server-config.js');
const authRouter = require('./routes/authRouter.js');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');

const port = process.env.PORT || 5000;

app.use(authRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;