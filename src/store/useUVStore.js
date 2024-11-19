// Mengimpor fungsi `create` dari pustaka Zustand untuk membuat store global
import { create } from 'zustand';

// Membuat store Zustand bernama `useStore`
const useStore = create((set) => ({
  // State awal untuk menyimpan data UV
  uvData: {
    currentData: null,      
    forecastData: null,     
    allForecastData: [],    
    locationName: '',       
    isLoading: false,       
    error: null             
  },

  // Setter untuk mengupdate data UV (saat ini dan ramalan)
  setUVData: (data) => set((state) => ({
    uvData: {
      ...state.uvData,              
      currentData: data?.now || null,  
      forecastData: data?.forecast || null, 
      allForecastData: data?.allForecastData || null
    }
  })),

  // Setter untuk mengupdate ramalan UV yang dipilih
  setSelectedForecast: (forecast) => set((state) => ({
    uvData: {
      ...state.uvData,     
      forecastData: forecast 
    }
  })),

  // Setter untuk menyimpan semua data ramalan pada tanggal tertentu
  setAllForecastData: (data, selectedDate) => set((state) => ({
    uvData: {
      ...state.uvData,     
      allForecastData: data.filter((item) => {
        // Menyaring data forecast berdasarkan tanggal yang dipilih
        const forecastDate = new Date(item.time);
        const forecastDateString = forecastDate.toISOString().split('T')[0];
        return forecastDateString === selectedDate;
      })
    }
  })),

  // Setter untuk mengupdate nama lokasi
  setLocationName: (name) => set((state) => ({
    uvData: {
      ...state.uvData,     
      locationName: name   
    }
  })),

  // Setter untuk mengupdate status loading
  setLoading: (isLoading) => set((state) => ({
    uvData: {
      ...state.uvData,     
      isLoading           
    }
  })),

  // Setter untuk mengupdate error
  setError: (error) => set((state) => ({
    uvData: {
      ...state.uvData,     
      error                
    }
  })),

  // Fungsi untuk mereset store ke state awal
  resetStore: () => set({
    uvData: {
      currentData: null,      
      forecastData: null,     
      allForecastData: [],    
      locationName: '',       
      isLoading: false,       
      error: null             
    }
  })
}));

// Mengekspor store untuk digunakan di seluruh aplikasi
export default useStore;
