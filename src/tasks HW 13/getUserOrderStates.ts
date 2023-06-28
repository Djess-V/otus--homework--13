type FIXME = Exclude<OrderState, "buyingSupplies" | "producing">[];

const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const;

type OrderState = (typeof orderStates)[number];

export const getUserOrderStates = (states: OrderState[]): FIXME => {
  const filteredStates = [] as FIXME;
  states.forEach((element) => {
    if (element !== "buyingSupplies" && element !== "producing") {
      filteredStates.push(element);
    }
  });
  return filteredStates;
};
