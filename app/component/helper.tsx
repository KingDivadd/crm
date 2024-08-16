export const convert_to_unix = (dateString:string)=> {
    const date = new Date(dateString);
    return Math.floor(date.getTime() / 1000);
}

export const get_todays_date = ()=> {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return Math.floor(startOfDay.getTime() / 1000);
}

export function timestamp_to_readable_value(timestamp:number) {
    // Ensure the timestamp is a number
    if (typeof timestamp !== 'number' || isNaN(timestamp)) {
      throw new Error('Invalid timestamp');
    }
  
    // Create a Date object using the timestamp
    const date = new Date(Number(timestamp));
  
    // Check if the Date is valid
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
  
    // Extract the date components
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
  
    // Extract time components
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    // Determine AM/PM and adjust hours
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 hour to 12
  
    // Construct the final string
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
    
    return formattedDate;
  }
