export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          date_of_birth: string | null
          phone: string | null
          street_address: string | null
          suburb: string | null
          state: string | null
          postcode: string | null
          id_verified: boolean
          id_document_url: string | null
          assessment_status: 'none' | 'pending' | 'approved' | 'needs_info' | 'declined'
          role: 'customer' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          date_of_birth?: string | null
          phone?: string | null
          street_address?: string | null
          suburb?: string | null
          state?: string | null
          postcode?: string | null
          id_verified?: boolean
          id_document_url?: string | null
          assessment_status?: 'none' | 'pending' | 'approved' | 'needs_info' | 'declined'
          role?: 'customer' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          date_of_birth?: string | null
          phone?: string | null
          street_address?: string | null
          suburb?: string | null
          state?: string | null
          postcode?: string | null
          id_verified?: boolean
          id_document_url?: string | null
          assessment_status?: 'none' | 'pending' | 'approved' | 'needs_info' | 'declined'
          role?: 'customer' | 'admin'
          created_at?: string
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          user_id: string
          smoking_years: string | null
          cigarettes_per_day: string | null
          previous_quit_attempts: string | null
          current_nicotine_use: string | null
          health_conditions: Json | null
          medications: string | null
          pregnancy_status: boolean | null
          cardiovascular_conditions: boolean | null
          quit_motivation: string | null
          flavour_preference: string | null
          pharmacist_notes: string | null
          reviewed_by: string | null
          reviewed_at: string | null
          status: 'submitted' | 'approved' | 'needs_info' | 'declined'
          decline_reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          smoking_years?: string | null
          cigarettes_per_day?: string | null
          previous_quit_attempts?: string | null
          current_nicotine_use?: string | null
          health_conditions?: Json | null
          medications?: string | null
          pregnancy_status?: boolean | null
          cardiovascular_conditions?: boolean | null
          quit_motivation?: string | null
          flavour_preference?: string | null
          pharmacist_notes?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          status?: 'submitted' | 'approved' | 'needs_info' | 'declined'
          decline_reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          smoking_years?: string | null
          cigarettes_per_day?: string | null
          previous_quit_attempts?: string | null
          current_nicotine_use?: string | null
          health_conditions?: Json | null
          medications?: string | null
          pregnancy_status?: boolean | null
          cardiovascular_conditions?: boolean | null
          quit_motivation?: string | null
          flavour_preference?: string | null
          pharmacist_notes?: string | null
          reviewed_by?: string | null
          reviewed_at?: string | null
          status?: 'submitted' | 'approved' | 'needs_info' | 'declined'
          decline_reason?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          brand: string
          type: 'pod' | 'device' | 'nrt'
          nicotine_strength_mg: number | null
          volume_ml: number | null
          flavour: string
          schedule: 's3' | 'none'
          wholesale_price: number
          retail_price: number
          rrp: number
          stock_quantity: number
          min_order_qty: number
          image_url: string | null
          tga_notified: boolean
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          brand: string
          type: 'pod' | 'device' | 'nrt'
          nicotine_strength_mg?: number | null
          volume_ml?: number | null
          flavour: string
          schedule?: 's3' | 'none'
          wholesale_price: number
          retail_price: number
          rrp: number
          stock_quantity?: number
          min_order_qty?: number
          image_url?: string | null
          tga_notified?: boolean
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          brand?: string
          type?: 'pod' | 'device' | 'nrt'
          nicotine_strength_mg?: number | null
          volume_ml?: number | null
          flavour?: string
          schedule?: 's3' | 'none'
          wholesale_price?: number
          retail_price?: number
          rrp?: number
          stock_quantity?: number
          min_order_qty?: number
          image_url?: string | null
          tga_notified?: boolean
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'pharmacist_review' | 'dispensed' | 'shipped' | 'delivered' | 'cancelled'
          subtotal: number
          shipping_cost: number
          total: number
          stripe_payment_intent_id: string | null
          shipping_address: Json
          tracking_number: string | null
          shipped_at: string | null
          pharmacist_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'pharmacist_review' | 'dispensed' | 'shipped' | 'delivered' | 'cancelled'
          subtotal: number
          shipping_cost: number
          total: number
          stripe_payment_intent_id?: string | null
          shipping_address: Json
          tracking_number?: string | null
          shipped_at?: string | null
          pharmacist_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'pharmacist_review' | 'dispensed' | 'shipped' | 'delivered' | 'cancelled'
          subtotal?: number
          shipping_cost?: number
          total?: number
          stripe_payment_intent_id?: string | null
          shipping_address?: Json
          tracking_number?: string | null
          shipped_at?: string | null
          pharmacist_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          unit_price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          unit_price?: number
        }
      }
      sas_c_notifications: {
        Row: {
          id: string
          order_id: string
          user_id: string
          product_id: string
          tga_reference: string | null
          notification_date: string | null
          status: 'pending' | 'submitted' | 'confirmed'
          notes: string | null
        }
        Insert: {
          id?: string
          order_id: string
          user_id: string
          product_id: string
          tga_reference?: string | null
          notification_date?: string | null
          status?: 'pending' | 'submitted' | 'confirmed'
          notes?: string | null
        }
        Update: {
          id?: string
          order_id?: string
          user_id?: string
          product_id?: string
          tga_reference?: string | null
          notification_date?: string | null
          status?: 'pending' | 'submitted' | 'confirmed'
          notes?: string | null
        }
      }
    }
  }
}
