/*
  # Update RLS policies for UAVs table
  
  1. Changes
    - Drop existing policies
    - Create new policies with proper authentication checks
  
  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view all UAVs" ON uavs;
DROP POLICY IF EXISTS "Users can create UAVs" ON uavs;
DROP POLICY IF EXISTS "Users can update UAVs" ON uavs;
DROP POLICY IF EXISTS "Users can delete UAVs" ON uavs;

-- Create new policies with proper auth checks
CREATE POLICY "Enable read access for authenticated users"
  ON uavs
  FOR SELECT
  TO authenticated
  USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users"
  ON uavs
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users"
  ON uavs
  FOR UPDATE
  TO authenticated
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable delete access for authenticated users"
  ON uavs
  FOR DELETE
  TO authenticated
  USING (auth.role() = 'authenticated');