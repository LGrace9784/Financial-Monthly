// // Purpose: sends the user’s finance data to the backend and returns the calculated result payload.

const API_URL = "http://127.0.0.1:8000";

// Posts the current form payload to the FastAPI calculator endpoint and returns the JSON result.
export async function calculateFinance(payload) {
    const response = await fetch(`${API_URL}/api/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Calculation failed (${response.status})`);
    }

    return response.json();
}