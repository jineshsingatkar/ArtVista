
# ArtVista Gallery

ArtVista is an online marketplace for Indian art, connecting artists with art lovers across the globe. The platform enables users to browse, purchase, and appreciate a diverse collection of Indian artwork.

**URL**: https://lovable.dev/projects/2395b68c-37dd-42d7-8094-17aaba2ba14f

## Getting Started

Follow these steps to set up and run the project locally:

```sh
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd artvista-gallery

# Install dependencies
npm install

# Set up environment variables
# Copy the .env.example file to .env and fill in your values
cp .env.example .env

# Start the development server
npm run dev
```

## Database Setup

This project uses Supabase as the free database option. Follow these steps to set up your database:

### 1. Create a Supabase Account

1. Go to [Supabase](https://supabase.com/) and sign up for a free account
2. Create a new project from your dashboard
3. Note your project URL and anon key from the project settings

### 2. Configure Database Tables

You'll need to create the following tables in your Supabase dashboard:

#### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);
```

#### Artworks Table

```sql
CREATE TABLE artworks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  medium TEXT,
  dimensions TEXT,
  artist_id UUID REFERENCES users(id),
  in_stock BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view artworks" ON artworks
  FOR SELECT USING (true);
```

### 3. Adding Admin Users

To create an admin user:

1. First register a normal user through the application
2. Then use the Supabase SQL editor to update the user's admin status:

```sql
UPDATE users
SET is_admin = true
WHERE email = 'admin@example.com';
```

### 4. Connect Your Application

1. Copy your Supabase URL and anon key from the API settings in your Supabase dashboard
2. Add these values to your `.env` file:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Email Service Configuration

To enable the contact form to send emails:

1. Sign up for an email service like SendGrid, Mailgun, or EmailJS
2. Get your API endpoint and key
3. Add these values to your `.env` file:

```
VITE_EMAIL_API_ENDPOINT=https://api.youremailservice.com/send
VITE_EMAIL_API_KEY=your_email_service_api_key
```

## Admin Access

The admin dashboard can be accessed at `/admin`. To access it:

1. Register as a regular user
2. Have an existing admin update your user record to grant admin privileges (as shown above)
3. Log in with your credentials
4. Navigate to the `/admin` route

## Deployment

To deploy the application:

1. Click on "Publish" in the Lovable interface
2. Follow the deployment steps provided

## Technologies Used

- React + TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- Supabase (for authentication and database)
