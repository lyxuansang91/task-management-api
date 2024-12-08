"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefTransactionType = exports.TransactionType = exports.TransactionStatus = void 0;
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus[TransactionStatus["Success"] = 0] = "Success";
    TransactionStatus[TransactionStatus["Failed"] = 1] = "Failed";
    TransactionStatus[TransactionStatus["Pending"] = 2] = "Pending";
    TransactionStatus[TransactionStatus["Approved"] = 3] = "Approved";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Stake"] = 0] = "Stake";
    TransactionType[TransactionType["Unstake"] = 1] = "Unstake";
    TransactionType[TransactionType["Harvest"] = 2] = "Harvest";
    TransactionType[TransactionType["Bonus"] = 3] = "Bonus";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
var RefTransactionType;
(function (RefTransactionType) {
    RefTransactionType[RefTransactionType["Level"] = 0] = "Level";
    RefTransactionType[RefTransactionType["Rank"] = 1] = "Rank";
    RefTransactionType[RefTransactionType["Bonus"] = 2] = "Bonus";
})(RefTransactionType = exports.RefTransactionType || (exports.RefTransactionType = {}));
//# sourceMappingURL=transaction.js.map