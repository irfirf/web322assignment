# Climate Solutions Platform

A full-stack web application for showcasing and managing climate change mitigation projects with role-based access control.

**Live Demo:** [web322assignment-three.vercel.app](https://web322assignment-three.vercel.app)

**Note:** All code in this repository is my own work or derived from content taught in class. This README was created with assistance from Claude Sonnet 4.5.

## Features

- **Public Project Gallery**: Browse climate initiatives with detailed descriptions and imagery
- **Admin Portal**: Secure login for administrators to create, edit, and manage projects
- **User Authentication**: Session-based authentication with encrypted password storage
- **Responsive Design**: Mobile-friendly interface with modern CSS styling
- **Database Integration**: PostgreSQL database with full CRUD operations

## Tech Stack

**Frontend:**
- HTML5, CSS3, EJS (Embedded JavaScript Templates)
- Client-side form validation
- Responsive design

**Backend:**
- Node.js with Express.js framework
- RESTful API architecture
- Middleware for authentication and error handling
- Session management with express-session

**Database:**
- PostgreSQL for relational data storage
- Parameterized queries to prevent SQL injection
- Database schema with user and project tables

**Deployment:**
- Vercel for continuous deployment
- Environment variables for secure configuration

## Key Implementation Details

### Security Features
- Password hashing with bcrypt
- Session-based authentication
- Protected admin routes with middleware
- SQL injection prevention through parameterized queries

### Database Design
- Normalized PostgreSQL schema
- Foreign key relationships between users and projects
- Efficient queries with JOINs for data retrieval

### API Endpoints
- `GET /` - Home page with project gallery
- `GET /admin` - Admin dashboard (protected route)
- `POST /admin/projects` - Create new project
- `PUT /admin/projects/:id` - Update project
- `DELETE /admin/projects/:id` - Delete project
- `POST /login` - User authentication
- `POST /logout` - Session termination

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up PostgreSQL database
4. Configure environment variables in `.env`:
```
   DATABASE_URL=your_postgresql_connection_string
   SESSION_SECRET=your_session_secret
```
5. Run the application: `npm start`
6. Visit `http://localhost:3000`

## Learning Outcomes

This project demonstrates:
- Full-stack web development with Node.js and PostgreSQL
- RESTful API design and implementation
- User authentication and session management
- Database design and SQL query optimization
- Deployment and DevOps with Vercel
- Security best practices for web applications

## Course Information

**Course:** WEB322 - Web Programming Tools and Frameworks  
**Institution:** Seneca Polytechnic  
**Semester:** Fall 2024

## License

This project is an academic assignment created for educational purposes.
