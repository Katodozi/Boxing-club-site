// Usage: npm run seed:hash -- "your-password-here"
//
// IMPORTANT: Next.js expands $-prefixed sequences in .env files (its built-in
// env loader supports referencing other variables like $OTHER_VAR). A raw
// bcrypt hash such as $2a$10$abc... looks exactly like that syntax, and
// Next.js will silently mangle it -- deleting characters -- which makes
// admin login fail with a 401 even when your password is correct, and gives
// no error explaining why.
//
// The fix is to escape every literal $ as \$ in .env.local. This script
// prints both the raw hash (for reference) and the already-escaped line
// that is safe to paste directly into .env.local.
const bcrypt = require("bcryptjs");

const password = process.argv[2];

if (!password) {
  console.error("Please provide a password to hash.");
  console.error('Usage: npm run seed:hash -- "your-password-here"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
const escaped = hash.replace(/\$/g, "\\$");

console.log("\nRaw hash (for reference only -- do NOT paste this into .env.local):\n");
console.log(hash);
console.log("\nPaste this exact line into .env.local:\n");
console.log(`ADMIN_PASSWORD_HASH=${escaped}`);
console.log("");
