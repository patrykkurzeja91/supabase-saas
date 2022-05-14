export interface Lesson {
  created_at: string;
  description: string;
  id: number;
  title: string;
}
export interface Plan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: string;
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



export interface StripeEventObject {
  id: string;
  object: string;
  application?: any;
  application_fee_percent?: any;
  automatic_tax: Automatictax;
  billing_cycle_anchor: number;
  billing_thresholds?: any;
  cancel_at?: any;
  cancel_at_period_end: boolean;
  canceled_at?: any;
  collection_method: string;
  created: number;
  current_period_end: number;
  current_period_start: number;
  customer: string;
  days_until_due?: any;
  default_payment_method: string;
  default_source?: any;
  default_tax_rates: any[];
  description?: any;
  discount?: any;
  ended_at?: any;
  items: Items;
  latest_invoice: string;
  livemode: boolean;
  metadata: Metadata;
  next_pending_invoice_item_invoice?: any;
  pause_collection?: any;
  payment_settings: Paymentsettings;
  pending_invoice_item_interval?: any;
  pending_setup_intent?: any;
  pending_update?: any;
  plan: EventPlan;
  quantity: number;
  schedule?: any;
  start_date: number;
  status: string;
  test_clock?: any;
  transfer_data?: any;
  trial_end?: any;
  trial_start?: any;
}
interface Metadata{
  [key: string]: any;
}

interface EventPlan {
  id: string;
  object: string;
  active: boolean;
  aggregate_usage?: any;
  amount: number;
  amount_decimal: string;
  billing_scheme: string;
  created: number;
  currency: string;
  interval: string;
  interval_count: number;
  livemode: boolean;
  nickname?: any;
  product: string;
  tiers_mode?: any;
  transform_usage?: any;
  trial_period_days?: any;
  usage_type: string;
}

interface Paymentsettings {
  payment_method_options?: any;
  payment_method_types?: any;
}

interface Data {
  id: string;
  object: string;
  billing_thresholds?: any;
  created: number;
  metadata: Metadata;
  plan: EventPlan;
}
interface Items {
  object: string;
  data: Data[];
  has_more: boolean;
  total_count: number;
  url: string;
}

interface Automatictax {
  enabled: boolean;
}

