export function useRelativeTime() {
    const getRelativeTime = (timestamp: string) => {
      const now = new Date()
      const posted = new Date(timestamp)
      const diffInSeconds = Math.floor((now - posted) / 1000)
      
      if (diffInSeconds < 60) {
        return `${diffInSeconds}s`
      }
      
      const diffInMinutes = Math.floor(diffInSeconds / 60)
      if (diffInMinutes < 60) {
        return `${diffInMinutes}m`
      }
      
      const diffInHours = Math.floor(diffInMinutes / 60)
      if (diffInHours < 24) {
        return `${diffInHours}h`
      }
      
      const diffInDays = Math.floor(diffInHours / 24)
      if (diffInDays < 30) {
        return `${diffInDays}d`
      }
      
      return posted.toLocaleDateString('en-US', { 
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    }
  
    return {
      getRelativeTime
    }
  }