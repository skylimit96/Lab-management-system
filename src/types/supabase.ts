export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      uavs: {
        Row: {
          id: string
          uav_number: string
          location: string
          status: 'operational' | 'maintenance' | 'repair' | 'critical' | 'unknown'
          malfunctions: string
          arrival_date: string
          completion_date: string | null
          manager_signature: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          uav_number: string
          location: string
          status: 'operational' | 'maintenance' | 'repair' | 'critical' | 'unknown'
          malfunctions: string
          arrival_date: string
          completion_date?: string | null
          manager_signature?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          uav_number?: string
          location?: string
          status?: 'operational' | 'maintenance' | 'repair' | 'critical' | 'unknown'
          malfunctions?: string
          arrival_date?: string
          completion_date?: string | null
          manager_signature?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      uav_status: 'operational' | 'maintenance' | 'repair' | 'critical' | 'unknown'
    }
  }
}