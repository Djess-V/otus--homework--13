interface IObj {
  [key: string | number | symbol]: unknown;
}

type FIXME = Omit<IObj, keyof IObj>;

export const omit = <T extends Record<any, any>, K extends keyof T>(
  obj: T,
  keyToOmit: K
): FIXME => {
  const { [keyToOmit]: _, ...withoutKey } = obj;
  return withoutKey;
};
