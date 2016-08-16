/*eslint no-process-exit: 0, no-console: 0*/
/* global process, __dirname */
var del = require('del');
var path = require('path');
var argv = require('yargs').argv;
var _ = require('lodash');
var runSequence = require('run-sequence');
var gulp = require('gulp-help')(require('gulp'), {hideEmpty: true, hideDepsMessage: true});
var shell = require('gulp-shell');
var plumber = require('gulp-plumber');

// Development
gulp.task('default', ['help']);
gulp.task('dev', devAppTask);
gulp.task('eslint', 'Lints the JS code', eslintTask);
gulp.task('clean-tmp', 'Deletes the temp directory', cleanTmp);
gulp.task('sass-app', 'Compiles SASS to CSS', sassAppTask);
gulp.task('watch-app-sass', 'Compiles SASS to CSS on every change', sassAppWatch);
gulp.task('generate-svg-sprite', generateSvgSpriteTask);

// Processing
gulp.task('bundle-app', bundleAppTask);
gulp.task('bundle-app-watched', bundleAppWatchedTask);
gulp.task('copy-app-assets', copyAppAssetsTask);
gulp.task('prepare-app-assets', prepareAppAssetsTask);
gulp.task('watch-app-assets', watchAppAssetsTask);

// Builds
gulp.task('build', buildAppTask);

// Testing
gulp.task('tests', 'Runs all unit tests', testsTask, {options: {'spec specfilename': 'Runs only requested spec files, example: gulp test --spec apiService,somethingService'}});
gulp.task('clean-coverage', 'Deletes the coverage directory', cleanCoverage);
gulp.task('coverage', 'Runs all unit tests with code coverage', coverageTask);

var TMP_PUBLIC = './.tmp/public';
var TMP_DIST = './.tmp/dist';
var isBuild = false;

var jsFiles = [
    'src/**/*.js'
];

var config = {
    scss: {
        scssFolder: 'src/public/admin/scss/',
        cssFolder: '.tmp/public/admin/css'
    },
    svgWeb: {
        sourceFolder: 'src/public/scss/assets/icons/',
        scssMapFolder: 'src/public/scss/core/',
        spriteFolder: '.tmp/public/images/'
    },
    images: 'src/public/images/'
};

var appPaths = {
    public: {
        assets: {
            src: './src/public',
            dest: TMP_PUBLIC
        },
        sass: {
            src: 'src/public/scss/styles.scss',
            dest: TMP_PUBLIC + '/css',
            watch: 'src/public/scss/**/*.scss'
        },
        webpack: {
            index: './src/index.js',
            dest: TMP_PUBLIC
        },
        svg: config.svgWeb
    }
};

var buildPaths = {
    public: {
        assets: {
            dest: TMP_DIST
        },
        sass: {
            dest: TMP_DIST + '/css'
        },
        webpack: {
            dest: TMP_DIST
        }
    }
};

function buildAppTask(done) {
    isBuild = true;

    runSequence(
        'clean-tmp',
        'prepare-app-assets',
        'bundle-app',
        done
    );
}

function eslintTask() {
    console.log('Running eslint task');
    var eslint = require('gulp-eslint');

    return gulp.src(jsFiles)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function cleanTmp(done) {
    del('./.tmp').then(() => done()).catch(done);
}

function swallowError(error) {
    // If you want details of the error in the console
    console.log('\x1b[36m', error.toString(), '\x1b[0m');
    this.emit('end');
}

function getConfig(app) {
    app = app || argv.app || 'public';

    var config = appPaths[app];

    if (!config) {
        throw new Error('Unknown app: ' + app);
    }

    if (isBuild) {
        var buildConfig = buildPaths[app];

        return _.merge(config, buildConfig);
    }

    return config;
}

function sassAppTask() {
    var cfg = getConfig().sass;

    return sassPipe(cfg.src, cfg.dest);
}

function sassPipe(src, dest) {

    var bootstrap = 'node_modules/bootstrap-sass/assets/stylesheets/';
    var flexboxgrid = 'node_modules/flexboxgrid/dist/flexboxgrid.css';
    var sass = require('gulp-sass');
    var sourcemaps = require('gulp-sourcemaps');
    return gulp.src([src])
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded',
            sourceMap: true,
            noCache: false,
            includePaths: [].concat(bootstrap, flexboxgrid)
        }))
        .on('error', swallowError)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dest));
}

function sassAppWatch() {
    var cfg = getConfig().sass;
    gulp.watch(cfg.watch, ['sass-app']);
}

function bundleAppTask() {
    var cfg = getConfig().webpack;

    return bundleWithWebpack(cfg.index, false, false)
        .pipe(gulp.dest(cfg.dest));
}

function bundleAppWatchedTask() {
    var cfg = getConfig().webpack;

    return bundleWithWebpack(cfg.index, true, true)
        .pipe(gulp.dest(cfg.dest));
}

function generateSvgSprite(svgConfig) {
    console.log('svgConfig.config', svgConfig.config);
    var svgSprite = require('gulp-svg-sprite');
    return gulp.src(svgConfig.sourceFolder + '*.svg')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(svgSprite(svgConfig.config))
        .pipe(gulp.dest('./'));
}

function generateSvgSpriteTask() {
    return generateSvgSprite(config.svgWeb);
}

function loadEnvFromArgs(defaultEnv) {
    const env = argv.e || argv.env || defaultEnv;

    if (env) {
        process.env.NODE_ENV = env;
    }
}

function testsTask(done) {
    require('babel-core/register');
    loadEnvFromArgs('test');

    if (argv.d || argv.delay) {
        process.env.DB_RESTORE_DELAY = argv.d || argv.delay;
    }

    var pattern = getTestPattern();
    var mocha = require('gulp-mocha');

    gulp
        .src(['src/**/' + pattern + '.spec.js'])
        .pipe(mocha({
            reporter: 'spec',
            timeout: 15000
        }))
        .on('end', function () {
            done();

            if (!process.env.KEEP_ALIVE) {
                process.exit(0);
            }
        });
}

function getTestPattern() {
    var specs = argv.s || argv.spec;
    var pattern = '*';

    if (specs) {
        specs = specs.split(',');

        specs = _.map(specs, function (value) {
            return value.trim();
        });

        if (specs.length > 1) {
            pattern = '*{' + specs.join(',') + '}*';
        } else {
            pattern = _.head(specs) + '*';
        }
    }
    return pattern;
}

function cleanCoverage(done) {
    del('./coverage').then(function () { done(); });
}

function extractPattern(specs) {
    if (!specs) {
        return '*';
    }

    specs = specs.split(',').map(function (value) {
        return value.trim();
    });

    return (specs.length > 1)
        ? '*{' + specs.join(',') + '}*'
        : '*' + _.head(specs) + '*';
}

function coverageTask(cb) {
    require('babel-core/register');
    var istanbul = require('gulp-istanbul');
    var isparta = require('isparta');
    var mocha = require('gulp-mocha');
    var specs = argv.s || argv.spec;
    var pattern = extractPattern(specs);

    loadEnvFromArgs('test');

    var coverageConfigName = argv.c || argv.config || 'default';

    var coverageConfigs = {
        default: {
            coverageDir: 'coverage/all',
            basePath: 'src'
        }
    };

    if (!specs) {
        // Default pattern if no specs provided
        pattern = '*{Helpers,Helper,Store}';
    }

    var coverageConfig = coverageConfigs[coverageConfigName] || coverageConfig['default'];

    var paths = {
        coverage: coverageConfig.coverageDir,
        scripts: [
            coverageConfig.basePath + '/**/' + pattern + '.js',
            '!src/**/tests/**',
            '!src/**/node_modules/**',
            '!src/**/*.spec.js',
            '!src/**/apiSpec.js',
            '!src/index.js',
            '!src/fluxibleApp.js',
            '!src/route-config.js'
        ],
        tests: [
            coverageConfig.basePath + '/**/' + pattern + '.spec.js',
            '!./src/**/node_modules/**'
        ]
    };

    var coverageDir = paths.coverage;

    gulp.src(paths.scripts)
        .pipe(istanbul({ // Covering files
            instrumenter: isparta.Instrumenter,
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function () {
            gulp.src(paths.tests, {read: false})
                .pipe(mocha({
                    reporter: 'spec',
                    timeout: 15000
                }))
                .pipe(istanbul.writeReports({
                    dir: coverageDir,
                    reportOpts: {dir: coverageDir},
                    reporters: ['text', 'text-summary', 'json', 'html']
                }))
                // .pipe(coverageEnforcer({
                //     thresholds: {
                //         statements: 80,
                //         branches: 50,
                //         lines: 80,
                //         functions: 50
                //     },
                //     coverageDirectory: coverageDir,
                //     rootDirectory : ''
                // }))
                .on('end', function () {
                    cb();
                    process.exit(0);
                });
        });
}

function copyAppAssetsTask() {
    var copy = require('gulp-copy');
    var secondaryAssets = [
        '**/*',
        '!**/scss/**/*'
    ];

    var cfg = getConfig().assets;

    return gulp
        .src(secondaryAssets, {cwd: cfg.src})
        .pipe(copy(cfg.dest));
}

function prepareAppAssetsTask(done) {
    runSequence(
        // 'generate-app-svg-sprite',
        'copy-app-assets',
        'sass-app',
        done
    );
}

function watchAppAssetsTask(done) {
    runSequence('watch-app-sass', done);
}

function devAppTask(done) {
    runSequence(
        'clean-tmp',
        'prepare-app-assets',
        'bundle-app-watched',
        'watch-app-assets',
        done
    );
}

function bundleWithWebpack(src, isWatched, isDev) {
    var withoutSourceMaps = argv.r || argv.noSourceMaps || false; // r - for RAW :)
    var gulpWebpack = require('webpack-stream');
    var webpack = gulpWebpack.webpack;

    var options = {
        watch: isWatched,
        resolve: {
            alias: {
                shared: path.resolve(path.dirname(src), '../shared'),
                admin: path.resolve(path.dirname(src), '../admin'),
                web: path.resolve(path.dirname(src), '../web')
            },
            root: [
                path.resolve(path.dirname(src) + '/node_modules')
            ]
        },
        module: {
            loaders: [
                {test: /\.jsx?/, exclude: /node_modules/, loader: 'babel'},
                {test: /\.json$/, loader: 'json'}
            ]
        },
        externals: [
            {'../api/proxy': {}}
        ],
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': process.env.NODE_ENV ? `"${process.env.NODE_ENV}"` : '"development"'
            })
        ],
        output: {filename: 'index.js'}
    };

    if (!isDev) {
        options.plugins.push(new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: true,
            comments: false,
            compress: {
                warnings: false
            }
        }));
        options.resolve.root.push(path.resolve(path.dirname(src), '../node_modules'));
    } else if (!withoutSourceMaps) {
        options.devtool = 'source-map';
    }

    return gulp.src(src)
        .pipe(plumber())
        .pipe(gulpWebpack(options));
}
