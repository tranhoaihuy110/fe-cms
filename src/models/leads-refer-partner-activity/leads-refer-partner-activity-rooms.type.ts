export interface IMartPotentialGetApi {
  potential_lead_id: string;
  property_name: string;
  property_type: string;
  description: string;
  lead_property_type: string;
  json_address: string;
  created_at: string;
  updated_at: string;
  full_address: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  price: string;
  size: string;
  created_by: string;
  potential_lead_status: string;
  potential_lead_assigned_to: string;
  add_to_lead: string;
  json_manual_to_lead: string;
}

export interface IMartPotentialResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IMartPotentialPatchApi {
  potential_lead_id : string;
  property_name: string,
  property_type: string,
  description: string,
  lead_property_type: string,
  json_address: string,
  full_address: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  address: string,
  city: string,
  state: string,
  postal_code: string,
  country: string,
  price: string,
  size: string,
  json_data: string,
  created_by: string,
  potential_lead_status: string,
  potential_lead_assigned_to: string,
  add_to_lead: string,
  json_manual_to_lead: string
}

export interface IMartPotentialPostApi {
  property_name: string,
  property_type: string,
  description: string,
  lead_property_type: string,
  json_address: string,
  full_address: string,
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  address: string,
  city: string,
  state: string,
  postal_code: string,
  country: string,
  price: string,
  size: string,
  json_data: string,
  created_by: string,
  potential_lead_status: string,
  potential_lead_assigned_to: string,
  add_to_lead: string,
  json_manual_to_lead: string
}