gendiff:
	node bin/gendiff.js

install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

test-coverage:
	npx jest --coverage

test:
	npm test

fix:
	npx eslint --fix .
