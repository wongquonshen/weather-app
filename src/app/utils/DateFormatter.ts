export function formatDateTime(unixTimestamp: number): string {
    // Create a new Date object from the Unix timestamp
    const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds

    // set to UTC for now
    const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kuala_Lumpur',
        hour12: true,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit' 
    };

    // format date and time
    const formattedDate = date.toLocaleDateString('en-US', options);
    
    return formattedDate;
}