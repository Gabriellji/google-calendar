export function formatDate(dateTime: string | null | undefined): string {
	if (!dateTime) {
	  return "Not specified";
	}
  
	const date = new Date(dateTime);
	if (isNaN(date.getTime())) {
	  return "Invalid date";
	}
  
	return date.toLocaleString("en-US", {
	  year: "numeric",
	  month: "long",
	  day: "numeric",
	  hour: "numeric",
	  minute: "2-digit",
	  hour12: true,
	});
  }
  