export const validateCity = (name: string, country: string): string | null => {
    const trimmedName = name.trim();
    const trimmedCountry = country.trim();

    if (!trimmedName) {
        return 'City name cannot be empty';
    }
    if (trimmedName.length < 2) {
        return 'City name must be at least 2 characters long';
    }
    if (trimmedName.length > 50) {
        return 'City name cannot be longer than 50 characters';
    }
    if (!trimmedCountry) {
        return 'Country cannot be empty';
    }
    if (trimmedCountry.length < 2) {
        return 'Country must be at least 2 characters long';
    }
    if (trimmedCountry.length > 50) {
        return 'Country cannot be longer than 50 characters';
    }
    return null;
};

export const validateLocation = (name: string, description: string): string | null => {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
        return 'Location name cannot be empty';
    }
    if (trimmedName.length < 2) {
        return 'Location name must be at least 2 characters long';
    }
    if (trimmedName.length > 50) {
        return 'Location name cannot be longer than 50 characters';
    }
    if (!trimmedDescription) {
        return 'Description cannot be empty';
    }
    if (trimmedDescription.length < 10) {
        return 'Description must be at least 10 characters long';
    }
    if (trimmedDescription.length > 500) {
        return 'Description cannot be longer than 500 characters';
    }
    return null;
};