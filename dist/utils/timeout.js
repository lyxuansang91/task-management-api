"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = void 0;
const timeout = (prom, time) => Promise.race([
    prom,
    new Promise((_r, rej) => setTimeout(rej, time, 'Operation timed out')),
]);
exports.timeout = timeout;
//# sourceMappingURL=timeout.js.map