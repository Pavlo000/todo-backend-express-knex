const app = require('./server-config.js');
const authRouter = require('./routes/authRouter.js');
const notFoundMiddleware = require('./middlewares/notFoundMiddleware.js');
const errorMiddleware = require('./middlewares/errorMiddleware.js');
const todoRouter = require('./routes/todoRouter.js');
const todoUserRouter = require('./routes/todoUserRouter.js');

const port = process.env.PORT || 5000;

app.use(authRouter);
app.use('/todos', todoRouter);
app.use('/todoUsers', todoUserRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;