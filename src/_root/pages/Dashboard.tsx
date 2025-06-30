
import Header from '../../lib/components/Header';
import AnalyticsTable from '../../lib/tables/AnalyticsTable';
import HistoryTable from '../../lib/tables/HistoryTable';
import ServicesTable from "../../lib/tables/ServicesTable";
import { useState } from "react";




const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"services" | "analytics" | "history">("services");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-6 flex gap-4">
          <button className={`px-4 py-2 rounded ${activeTab === "services" ? "bg-blue-600 text-white" : "bg-white border"}`}
            onClick={() => setActiveTab("services")}
          > Serviços
          </button>
          <button className={`px-4 py-2 rounded ${activeTab === "analytics" ? "bg-blue-600 text-white" : "bg-white border"}`}
            onClick={() => setActiveTab("analytics")}
          > Analíticos
          </button>
          <button className={`px-4 py-2 rounded ${activeTab === "history" ? "bg-blue-600 text-white" : "bg-white border"}`}
            onClick={() => setActiveTab("history")}
          > Histórico
          </button>
        </div>

        {activeTab === "services" && <ServicesTable />}
        {activeTab === "analytics" && <AnalyticsTable />}
        {activeTab === "history" && <HistoryTable />}

      </main>

    </div>
  )
}

export default Dashboard