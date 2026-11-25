#!/usr/bin/env bash
# Checks that the tools this project needs are installed.
# Used by humans (new team members) and AI agents before starting work.
set -u
ok=true
check() {
  if command -v "$1" >/dev/null 2>&1; then
    printf '✔ %-6s %s\n' "$1" "$($1 --version 2>/dev/null | head -1)"
  else
    printf '✘ %-6s not installed — %s\n' "$1" "$2"; ok=false
  fi
}
check node "install Node.js 22.12 or newer (Mac: brew install node)"
check npm  "comes with Node.js"
check git  "install Git (Mac: brew install git)"
check gh   "optional: GitHub CLI for pull requests (Mac: brew install gh)"
node -e 'const [a,b]=process.versions.node.split(".").map(Number);process.exit(a>22||(a===22&&b>=12)?0:1)' 2>/dev/null \
  || { echo "✘ Node.js 22.12+ required"; ok=false; }
$ok && echo "All required tools found." || { echo "Some tools are missing."; exit 1; }
