const API_BASE_URL = 'https://YOUR_API_ID.execute-api.ap-southeast-2.amazonaws.com';    // NEED TO CREATE API BEFORE UPDATING YOUR_API_ID

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

export function getInventory(token: string) {
    return request('/inventory', {
        'headers': {
            Authorization: `Bearer ${token}`,
        },
    });
}

export function addInventoryItem(
    token: string,
    item: { name: string; barcode?: string; quantity: number; expiry?: string },
) {
    return request('/inventory', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
    });
}