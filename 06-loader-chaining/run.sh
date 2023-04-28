node  --no-warnings \
  --loader ../04-loader-reading-http/loader.js \
  --loader ../05-loader-transforming-ts/loader.js \
  --loader ../03-loader-resolving-overrides/loader.js \
  ./main2.js


# This doesn't work, because the override loader is used last and doesn't know what to do with the http urls!
node --no-warnings \
  --loader ../03-loader-resolving-overrides/loader.js \
  --loader ../04-loader-reading-http/loader.js \
  --loader ../05-loader-transforming-ts/loader.js \
  ./main2.js


# This doesn't work, because the http loader needs to be before the ts one ""
node  --no-warnings \
  --loader ../05-loader-transforming-ts/loader.js \
  --loader ../04-loader-reading-http/loader.js \
  --loader ../03-loader-resolving-overrides/loader.js \
  ./main2.js
