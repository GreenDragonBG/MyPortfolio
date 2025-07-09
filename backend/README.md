# 3D Online Shop - Backend Implementation

This directory contains the backend implementation for the 3D online shop, following a microservices architecture pattern.

## Project Structure

```
backend/
├── api-gateway/           # API Gateway service
├── services/              # Microservices
│   ├── product-service/   # Product catalog management
│   ├── user-service/      # User authentication & profiles
│   ├── order-service/     # Order processing
│   ├── asset-service/     # 3D asset management
│   ├── payment-service/   # Payment processing
│   └── analytics-service/ # Analytics & reporting
├── shared/                # Shared utilities and types
├── docker-compose.yml     # Development environment
├── k8s/                   # Kubernetes manifests
└── scripts/               # Deployment scripts
```

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Development Setup

1. **Clone and install dependencies:**
```bash
cd backend
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start development environment:**
```bash
docker-compose up -d
```

4. **Run database migrations:**
```bash
npm run migrate
```

5. **Start all services:**
```bash
npm run dev
```

## Service Details

### API Gateway

**Location:** `api-gateway/`

**Purpose:** Central entry point for all client requests, handling authentication, rate limiting, and request routing.

**Key Features:**
- Request routing to microservices
- JWT authentication
- Rate limiting
- CORS handling
- Request/response logging
- Health checks

**API Endpoints:**
```
GET    /api/health          # Health check
POST   /api/auth/login      # User authentication
POST   /api/auth/register   # User registration
GET    /api/products        # Product catalog
GET    /api/products/:id    # Product details
POST   /api/orders          # Create order
GET    /api/orders          # User orders
```

### Product Service

**Location:** `services/product-service/`

**Purpose:** Manages product catalog, categories, and product metadata.

**Key Features:**
- Product CRUD operations
- Category management
- Search and filtering
- Product recommendations
- Inventory tracking

**Database Schema:**
```sql
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id UUID REFERENCES categories(id),
    sku VARCHAR(100) UNIQUE,
    stock_quantity INTEGER DEFAULT 0,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT NOW()
);
```

### User Service

**Location:** `services/user-service/`

**Purpose:** Handles user authentication, profiles, and preferences.

**Key Features:**
- User registration and login
- JWT token management
- Profile management
- Password reset
- OAuth integration

**Database Schema:**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    preferences JSONB DEFAULT '{}',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Asset Service

**Location:** `services/asset-service/`

**Purpose:** Manages 3D assets, file uploads, and optimization pipeline.

**Key Features:**
- 3D model upload and storage
- Asset optimization (FBX → glTF)
- Thumbnail generation
- CDN integration
- Asset versioning

**Database Schema:**
```sql
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    asset_type VARCHAR(50) NOT NULL, -- 'model', 'texture', 'animation'
    file_url VARCHAR(500) NOT NULL,
    file_size BIGINT,
    optimization_level VARCHAR(20) DEFAULT 'medium',
    metadata JSONB,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE asset_optimizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID REFERENCES assets(id) ON DELETE CASCADE,
    quality_level VARCHAR(20) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_size BIGINT,
    processing_time INTEGER, -- milliseconds
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Order Service

**Location:** `services/order-service/`

**Purpose:** Handles order processing, payment integration, and shipping.

**Key Features:**
- Order creation and management
- Payment processing (Stripe/PayPal)
- Shipping integration
- Order status tracking
- Invoice generation

**Database Schema:**
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    shipping_address JSONB,
    billing_address JSONB,
    payment_method VARCHAR(50),
    payment_status VARCHAR(50) DEFAULT 'pending',
    shipping_method VARCHAR(50),
    tracking_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    customization JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## API Documentation

### Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <jwt_token>
```

### Product Endpoints

#### Get Products
```http
GET /api/products?category=electronics&price_min=100&price_max=500&page=1&limit=20
```

**Response:**
```json
{
  "products": [
    {
      "id": "uuid",
      "name": "Cutie Patootie cup",
      "description": "Premium cutie patootie cup with super sweet cherry on it.",
      "price": 299.99,
      "category": "electronics",
      "image": "https://example.com/image.jpg",
      "model3d": "https://example.com/model.gltf",
      "colors": ["Black", "White", "Blue"],
      "sizes": ["One Size"],
      "stock_quantity": 50
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

#### Get Product Details
```http
GET /api/products/:id
```

**Response:**
```json
{
  "id": "uuid",
  "name": "Cutie Patootie cup",
  "description": "Premium cutie patootie cup with super sweet cherry on it.",
  "price": 299.99,
  "category": "electronics",
  "images": [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg"
  ],
  "model3d": {
    "url": "https://example.com/model.gltf",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "file_size": 2048576,
    "optimization_level": "high"
  },
  "customizations": {
    "colors": [
      {"name": "Black", "hex": "#000000", "price_adjustment": 0},
      {"name": "White", "hex": "#FFFFFF", "price_adjustment": 0},
      {"name": "Blue", "hex": "#0000FF", "price_adjustment": 10.00}
    ],
    "sizes": [
      {"name": "One Size", "price_adjustment": 0}
    ]
  },
  "reviews": [
    {
      "id": "uuid",
      "user": "John Doe",
      "rating": 5,
      "comment": "Great product!",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "stock_quantity": 50
}
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Content-Type: application/json

{
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2,
      "customization": {
        "color": "Blue",
        "size": "One Size"
      }
    }
  ],
  "shipping_address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "US"
  },
  "payment_method": "stripe"
}
```

**Response:**
```json
{
  "id": "uuid",
  "status": "pending",
  "total_amount": 619.98,
  "items": [...],
  "shipping_address": {...},
  "payment_intent": {
    "client_secret": "pi_xxx_secret_xxx"
  },
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Development Workflow

### Adding a New Service

1. **Create service directory:**
```bash
mkdir services/new-service
cd services/new-service
npm init -y
```

2. **Install dependencies:**
```bash
npm install express cors helmet joi
npm install --save-dev @types/express @types/cors
```

3. **Create service structure:**
```
new-service/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── index.ts
├── tests/
├── Dockerfile
└── package.json
```

4. **Add to docker-compose.yml:**
```yaml
new-service:
  build: ./services/new-service
  ports:
    - "3001:3000"
  environment:
    - DATABASE_URL=postgresql://user:pass@postgres:5432/shop
  depends_on:
    - postgres
```

5. **Update API Gateway routes:**
```typescript
// api-gateway/src/routes/new-service.ts
router.use('/api/new-service', proxy('http://new-service:3000'));
```

### Database Migrations

1. **Create migration:**
```bash
npm run migration:create -- --name add_new_table
```

2. **Edit migration file:**
```sql
-- migrations/xxx_add_new_table.sql
CREATE TABLE new_table (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

3. **Run migration:**
```bash
npm run migration:run
```

### Testing

**Unit Tests:**
```bash
npm run test:unit
```

**Integration Tests:**
```bash
npm run test:integration
```

**E2E Tests:**
```bash
npm run test:e2e
```

## Deployment

### Production Environment

1. **Build Docker images:**
```bash
docker build -t 3d-shop/api-gateway:latest api-gateway/
docker build -t 3d-shop/product-service:latest services/product-service/
# ... build other services
```

2. **Deploy to Kubernetes:**
```bash
kubectl apply -f k8s/
```

3. **Monitor deployment:**
```bash
kubectl get pods
kubectl logs -f deployment/api-gateway
```

### Environment Variables

**Required for all services:**
```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@host:5432/shop
REDIS_URL=redis://host:6379
JWT_SECRET=your-secret-key
```

**Service-specific:**
```bash
# Asset Service
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=3d-shop-assets
CDN_URL=https://cdn.example.com

# Payment Service
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Analytics Service
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

## Monitoring & Logging

### Health Checks

Each service exposes a health check endpoint:

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0",
  "dependencies": {
    "database": "connected",
    "redis": "connected"
  }
}
```

### Logging

Services use structured logging with correlation IDs:

```typescript
import { logger } from '../utils/logger';

logger.info('Product created', {
  productId: 'uuid',
  userId: 'uuid',
  correlationId: 'req-id'
});
```

### Metrics

Prometheus metrics are exposed on `/metrics`:

```typescript
import { register, Counter, Histogram } from 'prom-client';

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});
```

## Security

### Authentication

JWT tokens are used for authentication:

```typescript
// Generate token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### Rate Limiting

API Gateway implements rate limiting:

```typescript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

### Input Validation

All inputs are validated using Joi:

```typescript
import Joi from 'joi';

const createProductSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().valid('electronics', 'furniture').required()
});

const { error, value } = createProductSchema.validate(req.body);
if (error) {
  return res.status(400).json({ error: error.details[0].message });
}
```

This backend implementation provides a solid foundation for the 3D online shop with scalable microservices, comprehensive API documentation, and production-ready features. 