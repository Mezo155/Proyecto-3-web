export const parseDate = (date) => { // "2024-06-03T19:00:52.817Z"
    const dateStr = date.split('T')[0] // "2024-06-03" ---> ["2024", "06", "03"]
    const [year, month, day] = dateStr.split('-')
  
    return `${day}-${month}-${year}`
  }
  