# API Documentation

## 🔗 Base Configuration

### API Base URL
```typescript
API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
MEDIA_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || API_BASE_URL
```

### Authentication
All authenticated endpoints require a JWT Bearer token in the Authorization header:
```
Authorization: Bearer <access_token>
```

### Common Headers
```typescript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <token>',
  'ngrok-skip-browser-warning': 'true',
  'User-Agent': 'pixelweave-client'
}
```

---

## 👤 User Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /user/register/`

**Description:** Create a new user account

**Request Body:**
```json
{
  "user_name": "string",
  "email": "string",
  "password": "string",
  "password2": "string",
  "first_name": "string",
  "last_name": "string"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "user_id": "string",
    "user_name": "string",
    "email": "string"
  }
}
```

**Validation:**
- `user_name`: Minimum 2 characters
- `email`: Valid email format
- `password`: Minimum 8 characters
- `password2`: Must match password

---

### 2. Login User
**Endpoint:** `POST /user/login/`

**Description:** Authenticate user and receive access tokens

**Request Body:**
```json
{
  "user_name": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "data": {
    "tokens": {
      "access": "string",
      "refresh": "string"
    },
    "user": {
      "user_id": "string",
      "user_name": "string",
      "email": "string",
      "credit": number,
      "created": "ISO 8601 datetime"
    }
  }
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials
- `400 Bad Request`: Missing required fields

---

## 🎨 Mockup Generation Endpoints

### 3. Create Mockup
**Endpoint:** `POST /pixel/mockup/`

**Description:** Initiate AI mockup generation with uploaded garment image

**Request:** `multipart/form-data`

**Form Fields:**
```typescript
{
  input_image: File,           // Image file (JPG, PNG, WEBP, max 5MB)
  garment_type: string,        // e.g., "t-shirt", "hoodie", "dress"
  image_size: string,          // e.g., "1080x566"
  model: JSON string,          // Model configuration (see below)
  background: JSON string,     // Background configuration (see below)
  extra: JSON string           // Additional parameters (see below)
}
```

**Model JSON Structure:**
```json
{
  "gender": "female" | "male",
  "age_group": "18-25" | "20-30" | "30-40" | "40-50" | "50+",
  "model_region": "Indian" | "European" | "African" | "East Asian" | "Latino" | "Middle Eastern" | "Global",
  "model_color": "fair skin" | "medium skin" | "olive skin" | "dark skin" | "pale skin",
  "model_type": "tall" | "petite" | "plus size" | "standard",
  "mood": "attitude" | "happy" | "serious" | "neutral" | "elegant",
  "body_type": "Athletic" | "Slim" | "Curvy" | "Muscular" | "Average",
  "hair_style": "string",      // e.g., "mullet", "long wavy"
  "hair_color": "string",      // e.g., "black", "blonde"
  "pose": "string"             // e.g., "casual standing pose with hands in pockets"
}
```

**Background JSON Structure:**
```json
{
  "location": "studio" | "street" | "forest" | "warehouse" | "cafe" | "beach" | "luxury store" | "minimalist living room",
  "lighting": "studio lighting" | "natural sunlight" | "dappled sunlight" | "dramatic lighting" | "warm indoor lighting" | "bright sunlight" | "interior retail lighting" | "soft window light"
}
```

**Extra JSON Structure:**
```json
{
  "camera_angle": "string",    // e.g., "slightly below eye level"
  "style": "string"            // e.g., "modern street style photography"
}
```

**Response:**
```json
{
  "data": {
    "id": number,
    "status": "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED",
    "bg_color": "string",
    "image": "string",           // URL to result image
    "mockup": "string",          // URL to result mockup
    "error_message": "string",   // Present if status is FAILED
    "created_at": "ISO 8601 datetime"
  }
}
```

**Status Codes:**
- `201 Created`: Mockup generation initiated
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Missing or invalid token
- `413 Payload Too Large`: File exceeds size limit

---

### 4. List Mockups
**Endpoint:** `GET /pixel/mockup/`

**Description:** Retrieve all mockups for the authenticated user

**Response:**
```json
{
  "data": [
    {
      "id": number,
      "status": "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED",
      "bg_color": "string",
      "image": "string",
      "mockup": "string",
      "error_message": "string",
      "created_at": "ISO 8601 datetime"
    }
  ]
}
```

**Alternative Response Format:**
```json
[
  {
    "id": number,
    "status": "string",
    ...
  }
]
```

---

## 💳 Payment Endpoints

### 5. Create Payment
**Endpoint:** `POST /payment/create/`

**Description:** Initiate payment for credit purchase

**Request Body:**
```json
{
  "amount": number,
  "credits": number
}
```

**Response:**
```json
{
  "payment_id": "string",
  "payment_url": "string",
  "status": "pending"
}
```

---

### 6. Verify Payment
**Endpoint:** `POST /payment/verify/`

**Description:** Verify payment completion and credit user account

**Request Body:**
```json
{
  "payment_id": "string",
  "transaction_id": "string"
}
```

**Response:**
```json
{
  "success": boolean,
  "credits_added": number,
  "new_balance": number
}
```

---

## 🔄 Polling Mechanism

### Mockup Status Polling

The frontend implements a polling mechanism to check mockup generation status:

1. **Initiate Generation:** POST to `/pixel/mockup/`
2. **Receive Job ID:** Extract `id` from response
3. **Poll for Status:** GET `/pixel/mockup/` every 3 seconds
4. **Find Job:** Locate job by `id` in response array
5. **Check Status:**
   - `PENDING` or `PROCESSING`: Continue polling
   - `COMPLETED`: Display result, stop polling
   - `FAILED`: Show error, stop polling
6. **Timeout:** Stop polling after 2 minutes

**Example Polling Code:**
```typescript
const pollInterval = setInterval(async () => {
  const listResponse = await apiFetch('/pixel/mockup/');
  const jobs = Array.isArray(listResponse) ? listResponse : listResponse.data;
  const job = jobs.find(j => j.id === jobId);
  
  if (job.status === 'COMPLETED') {
    clearInterval(pollInterval);
    // Handle completion
  } else if (job.status === 'FAILED') {
    clearInterval(pollInterval);
    // Handle error
  }
}, 3000);
```

---

## 🛡️ Error Handling

### Standard Error Response
```json
{
  "message": "string",
  "detail": "string",
  "errors": {
    "field_name": ["error message"]
  }
}
```

### Common HTTP Status Codes
- `200 OK`: Successful GET request
- `201 Created`: Successful POST request
- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `413 Payload Too Large`: File size exceeds limit
- `500 Internal Server Error`: Server error

---

## 📝 Data Types

### User Interface
```typescript
interface User {
  user_id: string;
  user_name: string;
  email: string;
  credit: number;
  created: string;
}
```

### Auth Response Interface
```typescript
interface AuthResponse {
  access: string;
  refresh: string;
  user?: User;
}
```

### Mockup Interface
```typescript
interface Mockup {
  id: number;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  bg_color?: string;
  image?: string;
  mockup?: string;
  error_message?: string;
  created_at?: string;
}
```

---

## 🔧 API Client Utilities

### Token Management
```typescript
// Get stored access token
getAccessToken(): string | null

// Store access token
setAccessToken(token: string): void

// Clear access token (logout)
clearAccessToken(): void
```

### API Fetch Wrapper
```typescript
apiFetch(endpoint: string, options?: FetchOptions): Promise<any>
```

**Features:**
- Automatic token injection
- Error handling
- JSON parsing
- CORS bypass headers
- Request/response logging
