// Complete SignNow API Implementation
const CLIENT_ID = 'e3384bc1c5d6c8ca163c5b9904e90dc1';
const CLIENT_SECRET = '885f0f0e13db8f4c2e40ab4cc9a92fb7';
const USERNAME = 'igorgleandro00@gmail.com';
const PASSWORD = 'Leandro@02';
const API_BASE = 'https://api.signnow.com';

// Step 1: Get Access Token
async function getAccessToken() {
    const response = await fetch(`${API_BASE}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        },
        body: new URLSearchParams({
            grant_type: 'password',
            username: USERNAME,
            password: PASSWORD,
        }),
    });

    if (!response.ok) {
        throw new Error('Authentication failed');
    }

    const data = await response.json();
    return data.access_token;
}

// Step 2: Upload PDF Document (do this once per template)
async function uploadDocument(token, pdfFile) {
    const formData = new FormData();
    formData.append('file', pdfFile);

    const response = await fetch(`${API_BASE}/document`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to upload document');
    }

    const data = await response.json();
    return data.id; // Document ID
}

// Step 3: Add Fields to Document (Text fields, Signatures, etc.)
async function addFieldsToDocument(token, documentId, fields) {
    const response = await fetch(`${API_BASE}/document/${documentId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fields: fields,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to add fields to document');
    }

    return await response.json();
}

// Step 4: Fill Document with JSON Data
async function fillDocument(token, documentId, fieldData) {
    const response = await fetch(`${API_BASE}/document/${documentId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fields: fieldData,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to fill document');
    }

    return await response.json();
}

// Step 5: Download Filled Document
async function downloadDocument(token, documentId) {
    const response = await fetch(`${API_BASE}/document/${documentId}/download`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to download document');
    }

    return await response.blob();
}

// Step 6: Prefill Fields (Alternative method - easier for form filling)
async function prefillFields(token, documentId, fieldData) {
    const response = await fetch(`${API_BASE}/document/${documentId}/prefill`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fields: fieldData,
        }),
    });

    if (!response.ok) {
        throw new Error('Failed to prefill fields');
    }

    return await response.json();
}

// Helper: Save blob as file
function downloadBlob(blob, filename = 'filled-document.pdf') {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Complete Workflow Example
async function completeSignNowWorkflow() {
    try {
        // 1. Authenticate
        console.log('Authenticating...');
        const token = await getAccessToken();
        console.log('Authenticated successfully');

        // 2. Upload document (do this once, save documentId)
        // const pdfFile = document.querySelector('input[type="file"]').files[0];
        // const documentId = await uploadDocument(token, pdfFile);
        // console.log('Document uploaded:', documentId);

        // 3. Use existing document ID
        const documentId = 'your_document_id_here';

        // 4. Prepare field data
        // Field structure: array of field objects with properties
        const fieldData = [
            {
                x: 100,           // X position on page
                y: 200,           // Y position on page
                width: 200,       // Field width
                height: 30,       // Field height
                page_number: 0,   // Page index (0-based)
                type: 'text',     // Field type: text, signature, initials, checkbox, etc.
                name: 'firstName',
                prefilled_text: 'John',
                required: true,
            },
            {
                x: 100,
                y: 250,
                width: 200,
                height: 30,
                page_number: 0,
                type: 'text',
                name: 'lastName',
                prefilled_text: 'Doe',
                required: true,
            },
            {
                x: 100,
                y: 300,
                width: 250,
                height: 30,
                page_number: 0,
                type: 'text',
                name: 'email',
                prefilled_text: 'john.doe@example.com',
            },
        ];

        // 5. Prefill the document
        console.log('Filling document...');
        await prefillFields(token, documentId, fieldData);
        console.log('Document filled successfully');

        // 6. Download the filled document
        console.log('Downloading document...');
        const pdfBlob = await downloadDocument(token, documentId);
        downloadBlob(pdfBlob, 'filled-document.pdf');

        console.log('Success! Document has been filled and downloaded.');
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Simple field filling (if fields already exist in template)
async function quickFillDocument(jsonData) {
    try {
        const token = await getAccessToken();
        const documentId = 'your_template_document_id';

        // Convert simple JSON to SignNow field format
        const fields = Object.entries(jsonData).map(([name, value], index) => ({
            name: name,
            prefilled_text: value,
        }));

        await prefillFields(token, documentId, fields);
        const pdfBlob = await downloadDocument(token, documentId);
        downloadBlob(pdfBlob, 'filled-document.pdf');

        return true;
    } catch (error) {
        console.error('Error:', error.message);
        return false;
    }
}

// Example usage:
// completeSignNowWorkflow();

// Or quick fill:
// quickFillDocument({
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john@example.com',
//   phone: '+1234567890',
// });