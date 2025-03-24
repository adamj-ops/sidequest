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
      users: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          avatar_url: string | null
          role: 'admin' | 'manager' | 'client'
          organization_id: string | null
          title: string | null
          phone: string | null
          timezone: string | null
          preferences: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'manager' | 'client'
          organization_id?: string | null
          title?: string | null
          phone?: string | null
          timezone?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          avatar_url?: string | null
          role?: 'admin' | 'manager' | 'client'
          organization_id?: string | null
          title?: string | null
          phone?: string | null
          timezone?: string | null
          preferences?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      organizations: {
        Row: {
          id: string
          name: string
          logo_url: string | null
          billing_address: string | null
          contact_email: string | null
          contact_phone: string | null
          subscription_tier: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url?: string | null
          billing_address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          subscription_tier?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string | null
          billing_address?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          subscription_tier?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          description: string | null
          organization_id: string
          status: 'planning' | 'active' | 'on_hold' | 'completed'
          start_date: string | null
          target_completion_date: string | null
          actual_completion_date: string | null
          budget: number | null
          cover_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          organization_id: string
          status?: 'planning' | 'active' | 'on_hold' | 'completed'
          start_date?: string | null
          target_completion_date?: string | null
          actual_completion_date?: string | null
          budget?: number | null
          cover_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          organization_id?: string
          status?: 'planning' | 'active' | 'on_hold' | 'completed'
          start_date?: string | null
          target_completion_date?: string | null
          actual_completion_date?: string | null
          budget?: number | null
          cover_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          project_id: string
          assignee_id: string | null
          status: 'not_started' | 'in_progress' | 'in_review' | 'completed'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          due_date: string | null
          estimated_hours: number | null
          actual_hours: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          project_id: string
          assignee_id?: string | null
          status?: 'not_started' | 'in_progress' | 'in_review' | 'completed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          due_date?: string | null
          estimated_hours?: number | null
          actual_hours?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          project_id?: string
          assignee_id?: string | null
          status?: 'not_started' | 'in_progress' | 'in_review' | 'completed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          due_date?: string | null
          estimated_hours?: number | null
          actual_hours?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          content: string
          user_id: string
          project_id: string
          task_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          user_id: string
          project_id: string
          task_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          user_id?: string
          project_id?: string
          task_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          name: string
          description: string | null
          file_url: string
          file_type: string
          file_size: number
          project_id: string
          uploaded_by: string
          version: number
          status: 'draft' | 'review' | 'approved' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          file_url: string
          file_type: string
          file_size: number
          project_id: string
          uploaded_by: string
          version?: number
          status?: 'draft' | 'review' | 'approved' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          file_url?: string
          file_type?: string
          file_size?: number
          project_id?: string
          uploaded_by?: string
          version?: number
          status?: 'draft' | 'review' | 'approved' | 'archived'
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          project_id: string
          amount: number
          status: 'draft' | 'sent' | 'paid' | 'overdue'
          issue_date: string
          due_date: string
          payment_date: string | null
          invoice_number: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          amount: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue'
          issue_date: string
          due_date: string
          payment_date?: string | null
          invoice_number: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          amount?: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue'
          issue_date?: string
          due_date?: string
          payment_date?: string | null
          invoice_number?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          action_type: 'created' | 'updated' | 'deleted' | 'commented' | 'uploaded'
          entity_type: 'project' | 'task' | 'document' | 'invoice'
          entity_id: string
          details: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          action_type: 'created' | 'updated' | 'deleted' | 'commented' | 'uploaded'
          entity_type: 'project' | 'task' | 'document' | 'invoice'
          entity_id: string
          details?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          action_type?: 'created' | 'updated' | 'deleted' | 'commented' | 'uploaded'
          entity_type?: 'project' | 'task' | 'document' | 'invoice'
          entity_id?: string
          details?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      log_activity: {
        Args: {
          user_id: string
          action_type: string
          entity_type: string
          entity_id: string
          details: Json
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
