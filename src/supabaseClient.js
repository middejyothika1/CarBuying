import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://xpndnmhdvyovqglcfztp.supabase.co"
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwbmRubWhkdnlvdnFnbGNmenRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NTQ2OTIsImV4cCI6MjA2NjQzMDY5Mn0.ikSzP2e2mp0Jcmljkd_0Aw9Wu3nH3sFhldI8iA_4kkA'

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey.slice(0, 5) + '...' + supabaseKey.slice(-5));

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Function to handle Google authentication with redirect
export const handleGoogleAuth = async (role, onSuccess) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
        data: {
          role: role // Pass the selected role
        }
      }
    });
    
    if (error) {
      console.error('Google auth error:', error);
      throw error;
    }
    
    // Store the role in localStorage before redirecting
    if (role) {
      localStorage.setItem('userRole', role);
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('Google authentication failed:', error);
    return { data: null, error };
  }
};

// Function to check if user is authenticated
export const checkAuthStatus = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { session, error: null };
  } catch (error) {
    console.error('Auth status check failed:', error);
    return { session: null, error };
  }
};

// Function to sign out
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Sign out failed:', error);
    return { error };
  }
};

// Should look like +919876543210 

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
    //   const fullPhoneNumber = `${cleanPhone}`;
    const fullPhoneNumber = "8125208291"
    console.log('Sending to Supabase:', fullPhoneNumber);

    try {
        const { data, error } = await supabase.auth.signInWithOtp({ phone: fullPhoneNumber });

        if (error) {
            throw error;
        }

        onRegister(fullPhoneNumber);

    } catch (error) {
        console.error('Supabase error:', error);
        alert(error.message);
    } finally {
        setLoading(false);
    }
};

