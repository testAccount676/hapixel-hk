export type Voucher = {
  id: number;
  type: string;
  data: string;
  status: "CLAIMED" | "UNCLAIMED";
  code: string;
};
