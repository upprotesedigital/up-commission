import { SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_CLERK_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_CLERK_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key:", supabaseAnonKey);



type services = {
  id: string; // uuid
  title: string;
  user_id: string;
  created_at?: string;
};

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const [services, setServices] = useState<services[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (import.meta.env.DEV && user?.id) {
      console.log("Current authenticated user ID:", user.id);
    }
  }, [user?.id]);

  useEffect(() => {
    if (import.meta.env.DEV && services.length > 0) {
      console.log("Current authenticated user ID:", services.map(service => service.user_id));
    }
  }, [services]);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("services").select("*");
      if (error) {
        setError(error.message);
      } else {
        setServices(data || []);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);
  if (loading) {
    return <div>Loading services...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white shadow-lg border-b border-slate-200">
        <SignedIn>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">UC</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">UP Commission</h1>
                  <p className="text-sm text-slate-500">Dashboard</p>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <h2 className="text-lg font-semibold text-slate-800">
                    Olá,{" "}
                    {isLoaded ? user?.fullName || user?.username || "User" : "Loading..."}
                  </h2>
                  <p className="text-sm text-slate-500">Bem-vindo de volta!</p>
                </div>
                <div className="transform hover:scale-105 transition-transform duration-200">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 ring-2 ring-blue-100 hover:ring-blue-200 transition-all"
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </SignedIn>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Services</h2>
          <ul className="space-y-2">
            {services.map((service) => (
              <li key={service.id} className="p-4 bg-white rounded shadow">
                <div className="font-semibold">{service.title}</div>
                <div className="text-slate-500">{service.user_id}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>

    </div>
  )
}

export default Dashboard