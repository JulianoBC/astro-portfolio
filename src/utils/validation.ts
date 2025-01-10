// Types for validation
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Constants for validation rules
export const VALIDATION_RULES = {
  name: {
    minLength: 2,
    maxLength: 50
  },
  message: {
    minLength: 10,
    maxLength: 1000
  }
} as const;

export interface FormData {
  name: string;
  email: string;
  message: string;
  [key: string]: string;
}

// Email validation with robust regex
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
  return emailRegex.test(email);
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Form field validation
export const validateRequired = (value: string, fieldName: string): ValidationError | null => {
  if (!value || value.trim().length === 0) {
    return {
      field: fieldName,
      message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`
    };
  }
  return null;
};

export const validateLength = (
  value: string,
  fieldName: string,
  minLength: number,
  maxLength?: number
): ValidationError | null => {
  if (value.trim().length < minLength) {
    return {
      field: fieldName,
      message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${minLength} characters`
    };
  }
  if (maxLength && value.trim().length > maxLength) {
    return {
      field: fieldName,
      message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must not exceed ${maxLength} characters`
    };
  }
  return null;
};

// Form validation
export const validateForm = (data: FormData): ValidationResult => {
  const errors: ValidationError[] = [];
  const { name, email, message } = data;

  // Validate name
  const nameRequiredError = validateRequired(name, 'name');
  const nameLengthError = validateLength(name, 'name', 2, 50);
  if (nameRequiredError) errors.push(nameRequiredError);
  if (nameLengthError) errors.push(nameLengthError);

  // Validate email
  const emailRequiredError = validateRequired(email, 'email');
  if (emailRequiredError) {
    errors.push(emailRequiredError);
  } else if (!validateEmail(email)) {
    errors.push({
      field: 'email',
      message: 'Email address is invalid. Please enter a valid email address (e.g., user@example.com)'
    });
  }

  // Validate message
  const messageRequiredError = validateRequired(message, 'message');
  const messageLengthError = validateLength(message, 'message', 10, 1000);
  if (messageRequiredError) errors.push(messageRequiredError);
  if (messageLengthError) errors.push(messageLengthError);

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Utility functions for error message handling
export const formatFieldName = (fieldName: string): string => {
  return fieldName
    .split(/(?=[A-Z])|[-_\s]/) // Split on capital letters, hyphens, underscores, and spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatErrorMessage = (error: ValidationError): string => {
  const fieldName = formatFieldName(error.field);
  return error.message.replace(new RegExp(error.field, 'i'), fieldName);
};

export const getFieldError = (errors: ValidationError[], fieldName: string): string | null => {
  const error = errors.find(err => err.field === fieldName);
  return error ? formatErrorMessage(error) : null;
};

// Combine multiple validation rules
export const combineValidations = (
  value: string,
  fieldName: string,
  validations: ((value: string, fieldName: string) => ValidationError | null)[]
): ValidationError | null => {
  for (const validation of validations) {
    const error = validation(value, fieldName);
    if (error) return error;
  }
  return null;
};