export const timeout = (prom: Promise<unknown>, time: number) =>
  Promise.race([
    prom,
    new Promise((_r, rej) => setTimeout(rej, time, 'Operation timed out')),
  ]);
