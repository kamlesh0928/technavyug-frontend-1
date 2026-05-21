import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, LayoutGrid, Award, Trophy } from "lucide-react";
import { fetchAnalytics } from "../../services/api";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";

const COLORS = ["#34d399", "#fb923c", "#ef4444", "#3b82f6"];

export default function Analytics() {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetchAnalytics();
        if (res.data) setStats(res.data);
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #c8d8e8 0%, #d8cce8 50%, #b8ccd8 100%)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              display: "inline-block",
              width: "40px",
              height: "40px",
              border: "4px solid #ccc",
              borderTopColor: "#4f46e5",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          <p
            style={{
              marginTop: "16px",
              color: "#1a1a2e",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            Loading Analytics...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Users",
      value: stats?.totalUsers || 0,
      gradient:
        "linear-gradient(135deg, rgba(76,175,80,0.75), rgba(102,187,106,0.75))",
      icon: <Users size={20} color="#fff" />,
    },
    {
      label: "Total Projects",
      value: stats?.totalProjects || 0,
      gradient:
        "linear-gradient(135deg, rgba(255,167,38,0.75), rgba(251,140,0,0.75))",
      icon: <LayoutGrid size={20} color="#fff" />,
    },
    {
      label: "Total Certificates",
      value: stats?.totalCertificates || 0,
      gradient:
        "linear-gradient(135deg, rgba(239,83,80,0.75), rgba(229,57,53,0.75))",
      icon: <Award size={20} color="#fff" />,
    },
    {
      label: "Total Achievements",
      value: stats?.totalAchievements || 0,
      gradient:
        "linear-gradient(135deg, rgba(66,165,245,0.75), rgba(30,136,229,0.75))",
      icon: <Trophy size={20} color="#fff" />,
    },
  ];

  const chartData = [
    { name: "Users", value: stats?.totalUsers || 0 },
    { name: "Projects", value: stats?.totalProjects || 0 },
    { name: "Certificates", value: stats?.totalCertificates || 0 },
    { name: "Achievements", value: stats?.totalAchievements || 0 },
  ];

  const total =
    (stats?.totalUsers || 0) +
    (stats?.totalProjects || 0) +
    (stats?.totalCertificates || 0) +
    (stats?.totalAchievements || 0);

  return (
    <div
      style={{
        flex: 1,
        minHeight: "100vh",
        overflowY: "auto",
        padding: "24px",
        boxSizing: "border-box",
        background:
          "linear-gradient(135deg, #c8d8e8 0%, #d8cce8 50%, #b8ccd8 100%)",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "24px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => navigate("/admin/dashboard")}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            border: "none",
            background: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={20} color="#1a1a2e" />
        </button>
        <h1
          style={{
            fontSize: "clamp(26px, 4vw, 32px)",
            fontWeight: "800",
            color: "#1a1a2e",
            margin: 0,
          }}
        >
          Analytics
        </h1>
      </div>

      {/* STAT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "22px",
        }}
      >
        {statCards.map((card) => (
          <div
            key={card.label}
            style={{
              background: card.gradient,
              borderRadius: "20px",
              padding: "20px",
              color: "#fff",
              position: "relative",
              overflow: "hidden",
              minHeight: "125px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.12)",
                right: "-25px",
                bottom: "-25px",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: "600" }}>
                {card.label}
              </span>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {card.icon}
              </div>
            </div>
            <div style={{ fontSize: "42px", fontWeight: "700" }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {/* BAR CHART */}
        <div
          style={{
            background: "#fff",
            borderRadius: "22px",
            padding: "24px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#1a1a2e",
              marginBottom: "20px",
            }}
          >
            System Analytics
          </h2>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <div style={{ minWidth: "300px" }}>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* PIE CHART */}
        <div
          style={{
            background: "#fff",
            borderRadius: "22px",
            padding: "24px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#1a1a2e",
              marginBottom: "20px",
            }}
          >
            Distribution
          </h2>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={110}
                dataKey="value"
                paddingAngle={4}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`pie-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TOTAL OVERVIEW */}
      <div
        style={{
          background: "#fff",
          borderRadius: "22px",
          padding: "24px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#1a1a2e",
            marginBottom: "24px",
          }}
        >
          Total Overview
        </h2>
        {chartData.map((item, index) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "22px",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <div
                style={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: COLORS[index],
                }}
              />
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                {item.name}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                {item.value}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  fontWeight: "600",
                }}
              >
                {total > 0
                  ? `${Math.round((item.value / total) * 100)}%`
                  : "0%"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
