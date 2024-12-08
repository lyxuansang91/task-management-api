export enum TransactionStatus {
  Success = 0,
  Failed,
  Pending,
  Approved,
}

export enum TransactionType {
  Stake = 0,
  Unstake,
  Harvest,
  Bonus,
}

export enum RefTransactionType {
  Level = 0,
  Rank,
  Bonus,
}
