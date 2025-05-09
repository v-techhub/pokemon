/* eslint-disable @typescript-eslint/no-explicit-any */

type KeyValue = {
  [key: string]: any;
};

type Pokemon = {
  name: string;
  id: string;
  height: number;
  weight: number;
  types: any[];
  stats: any[];
  sprites: KeyValue;
  [key: string]: any;
};

export type { KeyValue, Pokemon };
