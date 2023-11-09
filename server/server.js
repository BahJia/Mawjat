const chalk = require('chalk');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './.env' });

// Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message, err);
  console.log(
    chalk.hex('#ff6188').bold('UNHANDLED EXCEPTION! 💥 Shutting down...')
  );

  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE
mongoose.connect(DB).then(() => {
  console.log(chalk.hex('#78dce8').bold('DATABASE CONNECTION SUCCESSFUL'));
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log(
    chalk.hex('#78dce8').bold(`LISTENING ON PORT ${process.env.PORT}`)
  );
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log(
    chalk.hex('#ff6188').bold('UNHANDLED REJECTION! 💥 Shutting down...')
  );
  server.close(() => {
    process.exit(1);
  });
});
