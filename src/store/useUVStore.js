import {create} from 'zustand';

const useStore = create((set) => ({
  uvData: {
    currentData: null,
    forecastData: null,
    locationName: '',
    isLoading: false,
    error: null
  },
  setUVData: (data) => set((state) => ({
    uvData: {
      ...state.uvData,
      currentData: data?.now || null,
      forecastData: data?.forecast || null,
    }
  })),
  setSelectedForecast: (forecast) => set((state) => ({
    uvData: {
      ...state.uvData,
      forecastData: forecast
    }
  })),
  setLocationName: (name) => set((state) => ({
    uvData: {
      ...state.uvData,
      locationName: name
    }
  })),
  setLoading: (isLoading) => set((state) => ({
    uvData: {
      ...state.uvData,
      isLoading
    }
  })),
  setError: (error) => set((state) => ({
    uvData: {
      ...state.uvData,
      error
    }
  })),
  resetStore: () => set({
    uvData: {
      currentData: null,
      forecastData: null,
      locationName: '',
      isLoading: false,
      error: null
    }
  })
}));

export default useStore;