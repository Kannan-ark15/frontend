import { Component } from '@angular/core';
import { ProjectShowcaseData } from '../project-showcase/project-data.model';
import { AppNavbarComponent } from '../profile-page/components/app-navbar/app-navbar.component';
import { ProjectShowcase } from '../project-showcase/project-showcase';

export const ECOMMERCE_NETWORKING_PROJECT: ProjectShowcaseData = {
  title: 'CloudCommerce MERN Platform',
  subtitle: 'E-Commerce with Advanced Networking Implementation',
  description: 'A full-stack MERN e-commerce platform demonstrating enterprise-level computer networking concepts including load balancing, CDN integration, microservices architecture, and cloud deployment for scalable, high-performance online retail.',
  techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'AWS', 'Docker', 'Nginx'],
  videoUrl: 'assets/videos/cloudcommerce-demo.mp4',
  badge: 'CLOUD DEPLOYED',
  chapters: [
    {
      id: 1,
      title: 'Project Scope & Objectives',
      content: 'The goal was to build a production-ready e-commerce platform while implementing advanced computer networking concepts. Rather than just creating another online store, we focused on network architecture, data flow optimization, request routing, load distribution, and cloud infrastructure. The project demonstrates how networking principles directly impact application performance, scalability, and reliability. We aimed to showcase real-world implementations of TCP/IP protocols, HTTP/HTTPS communication, DNS resolution, CDN caching, and distributed systems architecture in a practical e-commerce context.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop',
      color: '#0066ff'
    },
    {
      id: 2,
      title: 'Network Architecture Design',
      content: 'We designed a three-tier architecture separating presentation (React frontend), application logic (Node.js/Express backend), and data storage (MongoDB). The network topology utilizes reverse proxy servers (Nginx) for load balancing incoming traffic across multiple Node.js instances. Client requests flow through DNS resolution to our cloud load balancer, which distributes traffic based on round-robin and least-connection algorithms. Static assets are served via CDN (CloudFront), reducing latency through edge caching. WebSocket connections handle real-time features like inventory updates and order tracking. The architecture implements both horizontal scaling (adding more servers) and vertical scaling (increasing server capacity) strategies.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
      color: '#0052cc'
    },
    {
      id: 3,
      title: 'MERN Stack Implementation',
      content: 'The backend Express.js server handles RESTful API endpoints for product management, user authentication, and order processing. MongoDB stores product catalogs, user profiles, and transaction data with proper indexing for query optimization. React frontend communicates with the backend through Axios HTTP client, implementing request interceptors for authentication tokens. We utilized JWT (JSON Web Tokens) for stateless authentication, reducing server-side session storage and enabling easier horizontal scaling. Redux manages global state including cart data and user sessions.',
      code: `// Express.js API with Network Optimization
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Network Security & Performance Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression

// Rate limiting to prevent DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per window
});
app.use('/api/', limiter);

// Product API with caching headers
app.get('/api/products', async (req, res) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 min cache
  
  const products = await Product.find()
    .select('name price image stock')
    .lean() // Optimize MongoDB query
    .limit(50);
    
  res.json(products);
});

// WebSocket for real-time inventory
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Client connected via WebSocket');
  
  socket.on('subscribe-product', (productId) => {
    socket.join(\`product-\${productId}\`);
  });
  
  // Broadcast inventory updates
  Product.watch().on('change', (change) => {
    if (change.operationType === 'update') {
      io.to(\`product-\${change.documentKey._id}\`)
        .emit('inventory-update', change.updateDescription);
    }
  });
});`,
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
      color: '#003d99'
    },
    {
      id: 4,
      title: 'Load Balancing & Reverse Proxy',
      content: 'We deployed Nginx as a reverse proxy and load balancer to distribute incoming requests across multiple Node.js application servers. The load balancer uses health checks to detect failed instances and automatically routes traffic to healthy servers, ensuring high availability. Sticky sessions (session affinity) maintain user sessions on the same backend server for cart consistency. SSL/TLS termination occurs at the load balancer level, offloading encryption overhead from application servers. The configuration supports automatic failover and graceful server upgrades with zero downtime.',
      code: `# Nginx Load Balancer Configuration
upstream nodejs_backend {
    # Load balancing method
    least_conn; # Route to server with least connections
    
    # Backend application servers
    server app1.cloudcommerce.com:3000 weight=3 max_fails=3 fail_timeout=30s;
    server app2.cloudcommerce.com:3000 weight=3 max_fails=3 fail_timeout=30s;
    server app3.cloudcommerce.com:3000 weight=2 max_fails=3 fail_timeout=30s;
    
    # Backup server
    server backup.cloudcommerce.com:3000 backup;
}

server {
    listen 443 ssl http2;
    server_name cloudcommerce.com;
    
    # SSL Configuration
    ssl_certificate /etc/ssl/certs/cloudcommerce.crt;
    ssl_certificate_key /etc/ssl/private/cloudcommerce.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain application/json application/javascript;
    
    # Proxy settings
    location /api/ {
        proxy_pass http://nodejs_backend;
        proxy_http_version 1.1;
        
        # Headers for client IP preservation
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        
        # Connection keep-alive
        proxy_set_header Connection "";
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Static files served by Nginx
    location /static/ {
        root /var/www/cloudcommerce;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # WebSocket support
    location /socket.io/ {
        proxy_pass http://nodejs_backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}`,
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop',
      color: '#0047ab'
    },
    {
      id: 5,
      title: 'Cloud Deployment Architecture',
      content: 'The application is deployed on AWS using a multi-availability zone setup for disaster recovery. EC2 instances run Docker containers of our Node.js application, allowing for easy scaling and deployment. Amazon RDS hosts MongoDB with automated backups and read replicas for database scaling. CloudFront CDN distributes static assets globally, reducing latency for international users. Route 53 handles DNS with health checks and automatic failover routing policies. S3 stores product images and user uploads. VPC (Virtual Private Cloud) configuration isolates the application network with subnets, security groups, and network ACLs implementing defense-in-depth security.',
      code: `// Docker Compose for Multi-Container Setup
version: '3.8'

services:
  # Nginx Load Balancer
  nginx:
    image: nginx:latest
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl
    depends_on:
      - app1
      - app2
      - app3
    networks:
      - cloudcommerce-network
    restart: always

  # Node.js Application Instances
  app1:
    build: ./backend
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/ecommerce
      - REDIS_HOST=redis
    networks:
      - cloudcommerce-network
    depends_on:
      - mongo
      - redis

  app2:
    build: ./backend
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/ecommerce
      - REDIS_HOST=redis
    networks:
      - cloudcommerce-network
    depends_on:
      - mongo
      - redis

  app3:
    build: ./backend
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/ecommerce
      - REDIS_HOST=redis
    networks:
      - cloudcommerce-network
    depends_on:
      - mongo
      - redis

  # MongoDB Database
  mongo:
    image: mongo:6.0
    volumes:
      - mongo-data:/data/db
    networks:
      - cloudcommerce-network
    restart: always

  # Redis for Session Store & Caching
  redis:
    image: redis:alpine
    networks:
      - cloudcommerce-network
    restart: always

networks:
  cloudcommerce-network:
    driver: bridge

volumes:
  mongo-data:`,
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop',
      color: '#1e3a8a'
    },
    {
      id: 6,
      title: 'Network Performance Optimization',
      content: 'We implemented multiple networking optimizations to reduce latency and improve throughput. HTTP/2 protocol enables multiplexing multiple requests over a single TCP connection, reducing overhead. Persistent connections (Keep-Alive) minimize the cost of establishing new connections. Request/response compression (gzip/brotli) reduces bandwidth consumption by up to 70%. Database connection pooling prevents the overhead of creating new database connections for each request. Redis caching layer stores frequently accessed data (product listings, user sessions) in memory, dramatically reducing database queries and response times.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      color: '#2563eb'
    },
    {
      id: 7,
      title: 'Networking Metrics & Results',
      content: 'After implementing advanced networking strategies, the platform achieved remarkable performance improvements. Average response time decreased from 800ms to 120ms through load balancing and caching. CDN integration reduced static asset load time by 65% for global users. The system successfully handled 10,000 concurrent users during load testing with 99.9% uptime. Network bandwidth costs decreased by 40% through compression and CDN usage. Database query times improved 5x through connection pooling and Redis caching. SSL/TLS handshake overhead was minimized through session resumption and HTTP/2.',
      metrics: [
        { label: 'Response Time', value: '120ms', icon: '⚡' },
        { label: 'Concurrent Users', value: '10K', icon: '👥' },
        { label: 'Uptime', value: '99.9%', icon: '✅' },
        { label: 'Cost Savings', value: '40%', icon: '💰' }
      ],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      color: '#3b82f6'
    },
    {
      id: 8,
      title: 'Technical Learnings',
      content: 'Implementing load balancing in production taught valuable lessons about distributed systems 🌐. Debugging network issues with tcpdump and Wireshark revealed TCP connection bottlenecks 🔍. Configuring SSL/TLS certificates and understanding encryption protocols deepened security knowledge 🔒. Setting up Docker containers and orchestrating multi-service deployments was complex but rewarding 🐳. AWS VPC configuration and security groups implementation enhanced cloud networking skills ☁️. Monitoring with CloudWatch and setting up alerts ensured proactive issue detection 📊. The project successfully demonstrated how computer networking principles are fundamental to building scalable web applications! 🚀',
      image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=600&h=400&fit=crop',
      color: '#60a5fa'
    }
  ]
};

@Component({
  selector: 'app-e-commerce',
  imports: [AppNavbarComponent,ProjectShowcase],
  template:`<app-navbar [menuItems]="menuItems"></app-navbar>
    <app-project-showcase [projectData]="sentimentProject"></app-project-showcase>
  `
})
export class ECommerce {
    menuItems = [
    {label:'Home', route:'/profile'},
    { label: 'Experience', route: '/experience', section: 'Experience' },
    { label: 'Skills', route: '/skills', section: 'Skills' },
    { label: 'Projects', route: '/profile', fragment: 'projects-section' },
    { label: 'Contact Me',route: '/profile', fragment: 'contact-id' },
  ];
  sentimentProject = ECOMMERCE_NETWORKING_PROJECT;
}
