/*
  # Initial UAV Management Schema

  1. New Tables
    - `uavs`
      - `id` (uuid, primary key)
      - `uav_number` (text, unique)
      - `location` (text)
      - `status` (text)
      - `malfunctions` (text)
      - `arrival_date` (date)
      - `completion_date` (date, nullable)
      - `manager_signature` (text, nullable)
      - `notes` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `uavs` table
    - Add policies for authenticated users to:
      - Read all UAVs
      - Create new UAVs
      - Update UAVs they have access to
      - Delete UAVs they have access to
*/

-- Create UAV status enum
CREATE TYPE uav_status AS ENUM (
  'operational',
  'maintenance',
  'repair',
  'critical',
  'unknown'
);

-- Create UAVs table
CREATE TABLE IF NOT EXISTS uavs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  uav_number text UNIQUE NOT NULL,
  location text NOT NULL,
  status uav_status NOT NULL DEFAULT 'unknown',
  malfunctions text NOT NULL,
  arrival_date date NOT NULL,
  completion_date date,
  manager_signature text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE uavs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all UAVs"
  ON uavs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create UAVs"
  ON uavs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update UAVs"
  ON uavs
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete UAVs"
  ON uavs
  FOR DELETE
  TO authenticated
  USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_uavs_updated_at
  BEFORE UPDATE ON uavs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();