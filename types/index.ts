export interface Lesson {
  created_at: string;
  description: string;
  id: number;
  title: string;
}

export interface Recurring {
  aggregate_usage?: any;
  interval: string;
  interval_count: number;
  trial_period_days?: any;
  usage_type: string;
}

export interface Price {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  livemode: boolean;
  lookup_key?: any;
  metadata: any;
  nickname?: any;
  product: string;
  recurring: Recurring;
  tax_behavior: string;
  tiers_mode?: any;
  transform_quantity?: any;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface Plan {
id: string;
name: string;
price: number;
currency: string;
interval: string;
}
