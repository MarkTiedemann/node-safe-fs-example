@echo off
setlocal

set node=17.9.0
set types_node=17.0.23

:: Download node
if not exist node.exe (
	curl -LO https://nodejs.org/dist/v%node%/win-x64/node.exe
)

:: Download @node/types
if not exist node_modules\@types\node (
	curl -LO https://registry.npmjs.org/@types/node/-/node-%types_node%.tgz
	tar zxf node-%types_node%.tgz
	del node-%types_node%.tgz
	md node_modules\@types
	move node node_modules\@types > nul
)

:: Run test
.\node.exe build-policy.mjs
.\node.exe --no-warnings --experimental-policy=policy.json ./untrusted.mjs
