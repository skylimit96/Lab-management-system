import { create } from 'zustand';
import { UAV, Status, DashboardStats } from '../types';
import { supabase } from '../lib/supabase';

interface UAVState {
  uavs: UAV[];
  filteredUAVs: UAV[];
  searchTerm: string;
  statusFilter: Status | 'all';
  loading: boolean;
  error: string | null;
  fetchUAVs: () => Promise<void>;
  addUAV: (uav: Omit<UAV, 'id'>) => Promise<void>;
  updateUAV: (id: string, updatedUAV: Partial<UAV>) => Promise<void>;
  deleteUAV: (id: string) => Promise<void>;
  setSearchTerm: (term: string) => void;
  setStatusFilter: (status: Status | 'all') => void;
  getStats: () => DashboardStats;
}

const useUAVStore = create<UAVState>((set, get) => ({
  uavs: [],
  filteredUAVs: [],
  searchTerm: '',
  statusFilter: 'all',
  loading: false,
  error: null,
  
  fetchUAVs: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('uavs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const uavs = data.map(uav => ({
        id: uav.id,
        uavNumber: uav.uav_number,
        location: uav.location,
        status: uav.status,
        malfunctions: uav.malfunctions,
        arrivalDate: uav.arrival_date,
        completionDate: uav.completion_date || undefined,
        managerSignature: uav.manager_signature || undefined,
        notes: uav.notes || undefined,
      }));
      
      set({ uavs, loading: false });
      get().setSearchTerm(get().searchTerm); // Update filtered results
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  
  addUAV: async (uav) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('uavs')
        .insert({
          uav_number: uav.uavNumber,
          location: uav.location,
          status: uav.status,
          malfunctions: uav.malfunctions,
          arrival_date: uav.arrivalDate,
          completion_date: uav.completionDate,
          manager_signature: uav.managerSignature,
          notes: uav.notes,
        });
      
      if (error) throw error;
      
      await get().fetchUAVs();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  
  updateUAV: async (id, updatedUAV) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('uavs')
        .update({
          uav_number: updatedUAV.uavNumber,
          location: updatedUAV.location,
          status: updatedUAV.status,
          malfunctions: updatedUAV.malfunctions,
          arrival_date: updatedUAV.arrivalDate,
          completion_date: updatedUAV.completionDate,
          manager_signature: updatedUAV.managerSignature,
          notes: updatedUAV.notes,
        })
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchUAVs();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  
  deleteUAV: async (id) => {
    set({ loading: true, error: null });
    try {
      const { error } = await supabase
        .from('uavs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      await get().fetchUAVs();
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
  
  setSearchTerm: (term) => {
    const { uavs, statusFilter } = get();
    
    set({ searchTerm: term });
    
    const lowercaseTerm = term.toLowerCase();
    const filtered = uavs.filter((uav) => {
      const matchesSearch = 
        uav.uavNumber.toLowerCase().includes(lowercaseTerm) ||
        uav.location.toLowerCase().includes(lowercaseTerm) ||
        uav.malfunctions.toLowerCase().includes(lowercaseTerm);
      
      const matchesStatus = statusFilter === 'all' || uav.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    set({ filteredUAVs: filtered });
  },
  
  setStatusFilter: (status) => {
    set({ statusFilter: status });
    get().setSearchTerm(get().searchTerm);
  },
  
  getStats: () => {
    const { uavs } = get();
    const today = new Date().toISOString().split('T')[0];
    
    const stats: DashboardStats = {
      total: uavs.length,
      operational: 0,
      maintenance: 0,
      repair: 0,
      critical: 0,
      unknown: 0,
      recentArrivals: 0,
      completedToday: 0
    };
    
    uavs.forEach((uav) => {
      stats[uav.status] += 1;
      
      const arrivalDate = new Date(uav.arrivalDate);
      const daysDiff = Math.floor((Date.now() - arrivalDate.getTime()) / (1000 * 60 * 60 * 24));
      if (daysDiff <= 7) {
        stats.recentArrivals += 1;
      }
      
      if (uav.completionDate && uav.completionDate.startsWith(today)) {
        stats.completedToday += 1;
      }
    });
    
    return stats;
  }
}));

export default useUAVStore;