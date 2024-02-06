// Default token settings
// SHA-1
// 30-second epoch interval
// 6-digit tokens

const totp = require("totp-generator");

// Keys provided must be base32 strings, ie. only containing characters matching (A-Z, 2-7, =).
// ONRWC5TBONTHGZTBONTGC43G
// const token = totp("JBSWY3DPEHPK3PXP");


const token = totp("JBSWY3DPEHPK3PXP", {
	digits: 6,
	algorithm: "SHA-512",
	period: 60,
	timestamp: 1465324707000,
});

console.log(token); // prints a 6-digit time-based token based on provided key and current time