# Carspace - Car Management System

A comprehensive car management system with role-based access for both administrators and users.

## Features

### 🔐 Authentication
- Phone number-based authentication with OTP verification
- Secure login/logout functionality
- Role-based access control

### 👤 User Role
- **Car Search & Browse**: Search through available cars with advanced filters
- **Filter Options**: Filter by fuel type, price range, and search terms
- **Car Details**: View comprehensive car information including specs, pricing, and descriptions
- **Purchase Requests**: Submit purchase requests for cars of interest
- **Request Tracking**: Monitor the status of your purchase requests (pending, approved, rejected)

### ⚙️ Admin Role
- **Car Management**: Add, edit, and delete car listings
- **Inventory Control**: Manage the complete car inventory
- **Pricing Updates**: Update car prices and details
- **Request Management**: Review and manage purchase requests from users
- **Request Actions**: Approve or reject purchase requests with status tracking

### 🗄️ Data Persistence
- Local storage-based data management (no backend required)
- Persistent car inventory and purchase requests
- User role preferences saved locally

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### First Time Setup
1. **Register/Login**: Use your phone number to register and verify with OTP
2. **Role Selection**: Choose between User or Admin role
3. **Start Using**: Access role-specific features based on your selection

### For Users
1. **Browse Cars**: Use the search and filter options to find cars
2. **Request Purchase**: Click "Request Purchase" on any car you're interested in
3. **Track Requests**: Check "My Requests" to see the status of your requests

### For Admins
1. **Manage Cars**: Use the "Car Management" tab to add, edit, or delete cars
2. **Handle Requests**: Use the "Purchase Requests" tab to review and manage user requests
3. **Update Inventory**: Keep car details and pricing up to date

## Technology Stack

- **Frontend**: React.js with Vite
- **Styling**: CSS3 with modern design principles
- **Authentication**: Supabase Auth
- **Data Storage**: Local Storage (browser-based)
- **UI Components**: Custom React components

## Project Structure

```
src/
├── components/
│   ├── AdminDashboard.jsx      # Admin interface
│   ├── UserDashboard.jsx       # User interface
│   ├── RoleSelection.jsx       # Role selection screen
│   ├── FeatureListing.jsx      # Car listing component
│   ├── Register.jsx           # Authentication
│   └── ...                    # Other components
├── assets/                    # Images and static files
├── App.jsx                    # Main application component
└── supabaseClient.js         # Supabase configuration
```

## Features in Detail

### Car Management (Admin)
- Add new cars with complete details
- Edit existing car information
- Delete cars from inventory
- Update pricing and specifications
- Manage car images and descriptions

### Purchase Request System
- Users can submit purchase requests
- Admins can approve/reject requests
- Status tracking (pending, approved, rejected)
- Request history and management

### Search & Filter System
- Text-based search across car titles and descriptions
- Filter by fuel type (Petrol, Diesel, Electric, Hybrid)
- Price range filtering
- Real-time search results

### Responsive Design
- Mobile-friendly interface
- Responsive grid layouts
- Touch-friendly interactions
- Cross-device compatibility

## Local Storage Schema

The application uses localStorage to persist data:

- `cars`: Array of car objects with complete details
- `purchaseRequests`: Array of purchase request objects
- `myRequests`: User's personal purchase requests
- `userRole`: Current user role (admin/user)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.
