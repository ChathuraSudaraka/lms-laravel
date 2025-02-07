import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isCollapsed: window.innerWidth < 1024,
    isMobile: window.innerWidth < 1024
  }),
  
  actions: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    },
    
    closeSidebar() {
      if (this.isMobile) {
        this.isCollapsed = true
      }
    },
    
    handleResize() {
      this.isMobile = window.innerWidth < 1024
      if (this.isMobile) {
        this.isCollapsed = true
      }
    }
  },
})
