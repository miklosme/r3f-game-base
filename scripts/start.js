process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

process.on('unhandledRejection', err => {
    throw err;
});

const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');

const formatMessages = require('webpack-format-messages');
const config = require('../webpack.config');

function clearConsole() {
    process.stdout.write(process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H');
}

let compiler;
try {
    compiler = webpack(config);
} catch (err) {
    console.log(chalk.red('Failed to compile.'));
    console.log();
    console.log(err.message || err);
    console.log();
    process.exit(1);
}

let lastInvalidatedTime = Date.now();

compiler.hooks.invalid.tap('invalid', () => {
    console.log(`${chalk.blue('Compiling...')}`);
    lastInvalidatedTime = Date.now();
});

compiler.hooks.done.tap('done', stats => {
    clearConsole();

    const messages = formatMessages(stats);

    if (!messages.errors.length) {
        console.log('The app is running at:');
        console.log(chalk.blueBright(`http://localhost:${config.devServer.port}`));
        console.log();
    }

    const diffTime = Date.now() - lastInvalidatedTime;
    const formattedDiffTime = `in ${Math.floor(diffTime / 100) / 10} seconds`;

    if (!messages.errors.length && !messages.warnings.length) {
        console.log(chalk.green(`Compiled successfully ${formattedDiffTime}!`));
        console.log();
    }

    if (messages.errors.length) {
        console.log(chalk.red('Failed to compile.'));
        console.log();
        messages.errors.forEach(message => {
            console.log(message);
            console.log();
        });
        // If errors exist, only show errors.
        return;
    }

    if (messages.warnings.length) {
        console.log(chalk.yellow(`Compiled with warnings ${formattedDiffTime}.`));
        console.log();
        messages.warnings.forEach(message => {
            console.log(message);
            console.log();
        });
    }
});

const devServer = new WebpackDevServer(config.devServer, compiler);

devServer.start();
