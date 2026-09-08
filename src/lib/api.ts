/* This file creates an API helper on the frontend of the application */
const API_BASE_URL = 'https://REPLACE_WITH_YOUR_API_URL'; // Self-explanatory: to replace with API URL from AWS API Gateway.

async function request(path: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });
    const text = await response.text();
    
    let data: any;
    try {
        data = text ? JSON.parse(text) : {};
    } catch {
        data = { message: text };
    }

    if (!response.ok) {
        throw new Error(data.message || `Request failed: ${response.status}`);
    }

    return data;
}

export function signup(email: string, password: string) {
    return request('/signup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

export function login(email: string, password: string) {
    return request('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

// We use the token to get the inventory of for the logged in user.
export function getInventory(token: string) {
    return request('/inventory', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

// literally adds an inventory item to the logged in user's inventory (this is what the token is used for)
// attributes with '?' indicate optional for barcode and expiry. 
export function addInventoryItem(
    token: string,
    item: {
        name: string;
        barcode?: string;
        quantity: number;
        expiry?: string;
    },
) {
    return request('/inventory', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
    });
}

export function deleteInventoryItem(token: string, itemId: string) {
    return request('/inventory', {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId }),
    });
}




