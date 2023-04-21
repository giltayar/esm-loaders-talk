node \
  --loader ../04-loader-reading-http/loader.js \
  --loader ../03-loader-transforming-ts/loader.js \
  --loader ../03-loader-resolving-overrides/loader.js \
  ./main.js


# This doesn't work, because the override loader is used last and doesn't know what to do with the http urls!
# node \
#   --loader ../03-loader-resolving-overrides/loader.js \
#   --loader ../04-loader-reading-http/loader.js \
#   --loader ../03-loader-transforming-ts/loader.js \
#   ./main.js


# This doesn't work, because the http loader needs to be before the ts one ""
node \
  --loader ../03-loader-transforming-ts/loader.js \
  --loader ../04-loader-reading-http/loader.js \
  --loader ../03-loader-resolving-overrides/loader.js \
  ./main.js