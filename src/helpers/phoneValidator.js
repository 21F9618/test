export function phoneValidator(phone) {
    const re = /^\d{11}$/; // Regex for 11-digit phone numbers
    if (!phone) return "Please fill in this field.";
    if (!re.test(phone)) return "Please enter a valid 11-digit phone number.";
    return "";
  }
  