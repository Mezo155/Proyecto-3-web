export const parseDate = (date) => { // "2024-06-03T19:00:52.817Z"
  if(!date){
    return ""
  }
    const dateStr = date.split('T')[0] // "2024-06-03" ---> ["2024", "06", "03"]
    const [year, month, day] = dateStr.split('-')
  
    return `${day}-${month}-${year}`
  }

export const parseYear = (date) => {
  if(!date){
    return ""
  }

  const [year, month, day] = date.split("-")
  return `${year}`
}

export const parseHours = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes} min`;
  } else {
    return `${hours} h ${remainingMinutes} min`;
  }
}