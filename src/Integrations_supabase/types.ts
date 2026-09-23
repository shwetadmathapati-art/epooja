export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          entity: string
          entity_id: string | null
          id: string
          meta: Json
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          entity: string
          entity_id?: string | null
          id?: string
          meta?: Json
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          entity?: string
          entity_id?: string | null
          id?: string
          meta?: Json
        }
        Relationships: []
      }
      bookings: {
        Row: {
          amount: number
          cancellation_charge: number
          cancellation_reason: string | null
          cancelled_at: string | null
          city: string
          created_at: string
          customer_id: string
          id: string
          latitude: number | null
          location_address: string
          longitude: number | null
          muhurat_label: string | null
          notes: string | null
          pooja_id: string | null
          priest_id: string | null
          reference: string
          scheduled_date: string
          scheduled_time: string
          status: Database["public"]["Enums"]["booking_status"]
          updated_at: string
          variant: Database["public"]["Enums"]["service_variant"]
        }
        Insert: {
          amount?: number
          cancellation_charge?: number
          cancellation_reason?: string | null
          cancelled_at?: string | null
          city?: string
          created_at?: string
          customer_id: string
          id?: string
          latitude?: number | null
          location_address?: string
          longitude?: number | null
          muhurat_label?: string | null
          notes?: string | null
          pooja_id?: string | null
          priest_id?: string | null
          reference?: string
          scheduled_date: string
          scheduled_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
          variant?: Database["public"]["Enums"]["service_variant"]
        }
        Update: {
          amount?: number
          cancellation_charge?: number
          cancellation_reason?: string | null
          cancelled_at?: string | null
          city?: string
          created_at?: string
          customer_id?: string
          id?: string
          latitude?: number | null
          location_address?: string
          longitude?: number | null
          muhurat_label?: string | null
          notes?: string | null
          pooja_id?: string | null
          priest_id?: string | null
          reference?: string
          scheduled_date?: string
          scheduled_time?: string
          status?: Database["public"]["Enums"]["booking_status"]
          updated_at?: string
          variant?: Database["public"]["Enums"]["service_variant"]
        }
        Relationships: [
          {
            foreignKeyName: "bookings_pooja_id_fkey"
            columns: ["pooja_id"]
            isOneToOne: false
            referencedRelation: "poojas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_priest_id_fkey"
            columns: ["priest_id"]
            isOneToOne: false
            referencedRelation: "priests"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_queries: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string
          user_id?: string | null
        }
        Relationships: []
      }
      festivals: {
        Row: {
          description: string
          festival_date: string
          id: string
          name: string
          suggested_pooja: string | null
        }
        Insert: {
          description?: string
          festival_date: string
          id?: string
          name: string
          suggested_pooja?: string | null
        }
        Update: {
          description?: string
          festival_date?: string
          id?: string
          name?: string
          suggested_pooja?: string | null
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          id: string
          image_key: string
          sort_order: number
          title: string
        }
        Insert: {
          id?: string
          image_key: string
          sort_order?: number
          title: string
        }
        Update: {
          id?: string
          image_key?: string
          sort_order?: number
          title?: string
        }
        Relationships: []
      }
      panchang: {
        Row: {
          abhijit_muhurat: string
          auspicious_windows: Json
          is_auspicious: boolean
          karana: string
          nakshatra: string
          panchang_date: string
          rahu_kaal: string
          sunrise: string
          sunset: string
          tithi: string
          vara: string
          yoga: string
        }
        Insert: {
          abhijit_muhurat?: string
          auspicious_windows?: Json
          is_auspicious?: boolean
          karana: string
          nakshatra: string
          panchang_date: string
          rahu_kaal?: string
          sunrise?: string
          sunset?: string
          tithi: string
          vara: string
          yoga: string
        }
        Update: {
          abhijit_muhurat?: string
          auspicious_windows?: Json
          is_auspicious?: boolean
          karana?: string
          nakshatra?: string
          panchang_date?: string
          rahu_kaal?: string
          sunrise?: string
          sunset?: string
          tithi?: string
          vara?: string
          yoga?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          id: string
          method: Database["public"]["Enums"]["payment_method"]
          status: Database["public"]["Enums"]["payment_status"]
          transaction_ref: string
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          id?: string
          method: Database["public"]["Enums"]["payment_method"]
          status?: Database["public"]["Enums"]["payment_status"]
          transaction_ref?: string
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          id?: string
          method?: Database["public"]["Enums"]["payment_method"]
          status?: Database["public"]["Enums"]["payment_status"]
          transaction_ref?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      poojas: {
        Row: {
          active: boolean
          base_price: number
          category: Database["public"]["Enums"]["pooja_category"]
          created_at: string
          description: string
          duration_minutes: number
          id: string
          items_price: number
          name: string
          sanskrit_name: string | null
          slug: string
        }
        Insert: {
          active?: boolean
          base_price?: number
          category?: Database["public"]["Enums"]["pooja_category"]
          created_at?: string
          description?: string
          duration_minutes?: number
          id?: string
          items_price?: number
          name: string
          sanskrit_name?: string | null
          slug: string
        }
        Update: {
          active?: boolean
          base_price?: number
          category?: Database["public"]["Enums"]["pooja_category"]
          created_at?: string
          description?: string
          duration_minutes?: number
          id?: string
          items_price?: number
          name?: string
          sanskrit_name?: string | null
          slug?: string
        }
        Relationships: []
      }
      priest_availability: {
        Row: {
          available_date: string
          end_time: string
          id: string
          is_blocked: boolean
          priest_id: string
          start_time: string
        }
        Insert: {
          available_date: string
          end_time?: string
          id?: string
          is_blocked?: boolean
          priest_id: string
          start_time?: string
        }
        Update: {
          available_date?: string
          end_time?: string
          id?: string
          is_blocked?: boolean
          priest_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "priest_availability_priest_id_fkey"
            columns: ["priest_id"]
            isOneToOne: false
            referencedRelation: "priests"
            referencedColumns: ["id"]
          },
        ]
      }
      priest_offerings: {
        Row: {
          active: boolean
          id: string
          pooja_id: string
          price_pooja_only: number
          price_with_items: number
          priest_id: string
        }
        Insert: {
          active?: boolean
          id?: string
          pooja_id: string
          price_pooja_only: number
          price_with_items: number
          priest_id: string
        }
        Update: {
          active?: boolean
          id?: string
          pooja_id?: string
          price_pooja_only?: number
          price_with_items?: number
          priest_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "priest_offerings_pooja_id_fkey"
            columns: ["pooja_id"]
            isOneToOne: false
            referencedRelation: "poojas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "priest_offerings_priest_id_fkey"
            columns: ["priest_id"]
            isOneToOne: false
            referencedRelation: "priests"
            referencedColumns: ["id"]
          },
        ]
      }
      priest_payouts: {
        Row: {
          amount: number
          booking_id: string
          created_at: string
          id: string
          paid_at: string | null
          priest_id: string
          status: Database["public"]["Enums"]["payout_status"]
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string
          id?: string
          paid_at?: string | null
          priest_id: string
          status?: Database["public"]["Enums"]["payout_status"]
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string
          id?: string
          paid_at?: string | null
          priest_id?: string
          status?: Database["public"]["Enums"]["payout_status"]
        }
        Relationships: [
          {
            foreignKeyName: "priest_payouts_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "priest_payouts_priest_id_fkey"
            columns: ["priest_id"]
            isOneToOne: false
            referencedRelation: "priests"
            referencedColumns: ["id"]
          },
        ]
      }
      priests: {
        Row: {
          aadhaar_verified: boolean
          bio: string
          city: string
          created_at: string
          experience_years: number
          full_name: string
          id: string
          languages: string[]
          latitude: number
          longitude: number
          phone: string | null
          photo_key: string | null
          rating: number
          reviews_count: number
          service_radius_km: number
          specialities: string[]
          status: Database["public"]["Enums"]["verification_status"]
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          aadhaar_verified?: boolean
          bio?: string
          city?: string
          created_at?: string
          experience_years?: number
          full_name: string
          id?: string
          languages?: string[]
          latitude?: number
          longitude?: number
          phone?: string | null
          photo_key?: string | null
          rating?: number
          reviews_count?: number
          service_radius_km?: number
          specialities?: string[]
          status?: Database["public"]["Enums"]["verification_status"]
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          aadhaar_verified?: boolean
          bio?: string
          city?: string
          created_at?: string
          experience_years?: number
          full_name?: string
          id?: string
          languages?: string[]
          latitude?: number
          longitude?: number
          phone?: string | null
          photo_key?: string | null
          rating?: number
          reviews_count?: number
          service_radius_km?: number
          specialities?: string[]
          status?: Database["public"]["Enums"]["verification_status"]
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          created_at: string
          email: string | null
          email_verified: boolean
          full_name: string
          id: string
          latitude: number | null
          longitude: number | null
          mobile_verified: boolean
          phone: string | null
          pincode: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          email_verified?: boolean
          full_name?: string
          id: string
          latitude?: number | null
          longitude?: number | null
          mobile_verified?: boolean
          phone?: string | null
          pincode?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string
          email?: string | null
          email_verified?: boolean
          full_name?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          mobile_verified?: boolean
          phone?: string | null
          pincode?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_priest_owner: { Args: { _priest_id: string }; Returns: boolean }
      owns_booking: { Args: { _booking_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "priest" | "customer"
      booking_status:
        | "pending_payment"
        | "awaiting_confirmation"
        | "confirmed"
        | "completed"
        | "cancelled"
      payment_method: "upi" | "card" | "netbanking"
      payment_status: "pending" | "paid" | "failed" | "refunded"
      payout_status: "pending" | "paid"
      pooja_category: "pooja" | "homa" | "consultation"
      service_variant: "pooja_only" | "pooja_with_items" | "online"
      verification_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "priest", "customer"],
      booking_status: [
        "pending_payment",
        "awaiting_confirmation",
        "confirmed",
        "completed",
        "cancelled",
      ],
      payment_method: ["upi", "card", "netbanking"],
      payment_status: ["pending", "paid", "failed", "refunded"],
      payout_status: ["pending", "paid"],
      pooja_category: ["pooja", "homa", "consultation"],
      service_variant: ["pooja_only", "pooja_with_items", "online"],
      verification_status: ["pending", "approved", "rejected"],
    },
  },
} as const
