export interface Performance {
  playID: string;
  audience: number;
  play: Play;
}

export interface Invoice {
  customer: string;
  performances: Performance[];
}

export interface Play {
  name: string;
  type: "tragedy" | "comedy";
}

export interface Plays {
  [key: string]: Play;
}

export interface Statement {
  customer: string;
  performances: Performance[];
}

export type Invoices = Invoice[];
