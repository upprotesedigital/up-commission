import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useUser } from "@clerk/clerk-react"; // Add Clerk for user auth
import ServiceModal from "../components/ServiceModal";

const supabaseUrl = import.meta.env.VITE_CLERK_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_CLERK_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type Service = {
  id: string;
  title: string;
  user_id: string;
  username: string;
  created_at?: string;
};

const ServicesTable = () => {
  const { user } = useUser(); // Get current user from Clerk
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      if (!user) return; // Don't fetch if no user

      setLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("user_id", user.id); // Only fetch services for current user

      if (error) {
        setError(error.message);
      } else {
        setServices(data || []);
      }
      setLoading(false);
    };
    fetchServices();
  }, [user]);

  const handleCreateService = async (title: string) => {
    if (!user) {
      setModalError("Usuário não autenticado");
      return;
    }

    setModalLoading(true);
    setModalError(null);

    try {
      if (!title.trim()) {
        throw new Error("O título do serviço é obrigatório");
      }

      const { data, error } = await supabase
        .from("services")
        .insert([
          {
            title: title.trim(),
            user_id: user.id, // Include user_id in the insert
            username: user.username || user.firstName || "Unknown",
          },
        ])
        .select();

      if (error) {
        throw new Error(error.message);
      }

      if (data && data.length > 0) {
        setServices((prev) => [...prev, ...data]);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro desconhecido";
      setModalError(errorMessage);
      throw err;
    } finally {
      setModalLoading(false);
    }
  };

  const handleOpenModal = () => {
    if (!user) {
      setError("Usuário não autenticado");
      return;
    }
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalError(null);
    setIsModalOpen(false);
  };

  // Show loading while user is being loaded
  if (!user) {
    return <div>Carregando usuário...</div>;
  }

  if (loading) {
    return <div>Carregando Serviços...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between py-7">
        <h2 className="font-bold text-xl">Serviços</h2>
        <div className="">
          <button
            className="py-1 px-6 bg-green-500 text-white rounded hover:bg-green-700 mr-2"
            onClick={handleOpenModal}
          >
            Criar Serviço
          </button>
          <button
            className="py-1 px-6 bg-blue-300 text-white rounded hover:bg-blue-700"
            onClick={() => window.location.reload()}
          >
            Atualizar
          </button>
        </div>
      </div>

      <ul className="space-y-2">
        {services.map((service) => (
          <li
            key={service.id}
            className="p-4 rounded shadow flex flex-row items-center space-x-8"
          >
            <div className="font-semibold w-1/4">{service.title}</div>
            <div className="w-1/4">{service.username}</div>
            <div className="w-1/4 text-xs text-gray-500">{service.user_id}</div>
            <div className="w-1/4">
              {new Date(service.created_at || "").toLocaleString("pt-BR", {
                dateStyle: "short",
                timeStyle: "short",
              })}
            </div>
          </li>
        ))}
      </ul>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateService}
        loading={modalLoading}
        error={modalError}
      />
    </div>
  );
};

export default ServicesTable;
