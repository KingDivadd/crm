export const convert_to_unix = (dateString:string)=> {
    const date = new Date(dateString);
    return Math.floor(date.getTime() / 1000);
}

export const get_todays_date = ()=> {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return Math.floor(startOfDay.getTime() / 1000);
}
