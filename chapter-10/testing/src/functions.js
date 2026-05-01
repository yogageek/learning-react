//受測系統 system under test = SUT

export function timesTwo(a) {
  return a * 2;
}

export function order(items) {
  const total = items.reduce(
    (price, item) => price + item.price,
    0
  );
  return {
    orderItems: items,
    total
  };
}

export const sum = (a, b) => a + b;