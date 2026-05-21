import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  FolderPlus,
  Award,
  Trophy,
  FileEdit,
  Trash2,
  Activity as ActivityIcon,
} from "lucide-react";
import { fetchActivity } from "../../services/api";

const ICON_MAP = {
  create: <FolderPlus size={18} color="#10b981" />,
  update: <FileEdit size={18} color="#3b82f6" />,
  delete: <Trash2 size={18} color="#ef4444" />,
};

const RESOURCE_ICON_MAP = {
  User: <Users size={18} color="#8b5cf6" />,
  Project: <FolderPlus size={18} color="#f59e0b" />,
  Certificate: <Award size={18} color="#ec4899" />,
  Achievement: <Trophy size={18} color="#3b82f6" />,
};

export default function Activity() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadActivities = useCallback(async (pageNum, append = false) => {
    try {
      if (append) setLoadingMore(true);
      else setLoading(true);

      const res = await fetchActivity(pageNum, 10);

      if (res.data) {
        setActivities((prev) =>
          append ? [...prev, ...res.data.activities] : res.data.activities,
        );
        setHasMore(res.data.hasMore);
        setPage(pageNum);
      }
    } catch {
      /* error handled silently */
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadActivities(1);
  }, [loadActivities]);

  const handleLoadMore = () => {
    loadActivities(page + 1, true);
  };

  const getIcon = (type, resource) => {
    return ICON_MAP[type] || RESOURCE_ICON_MAP[resource] || <ActivityIcon size={18} color="#6b7280" />;
  };

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
            Loading Activity...
          </p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

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
          Activity Log
        </h1>
      </div>

      {/* ACTIVITY LIST */}
      <div
        style={{
          background: "#fff",
          borderRadius: "22px",
          padding: "24px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}
      >
        {activities.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              color: "#9ca3af",
            }}
          >
            <ActivityIcon
              size={48}
              color="#d1d5db"
              style={{ marginBottom: "16px" }}
            />
            <p
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#6b7280",
                margin: "0 0 8px 0",
              }}
            >
              No activity found
            </p>
            <p style={{ fontSize: "14px", margin: 0 }}>
              Activity will appear here when actions are performed.
            </p>
          </div>
        ) : (
          <>
            {activities.map((item, i) => (
              <div
                key={item.id || i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "16px 0",
                  borderBottom:
                    i !== activities.length - 1
                      ? "1px solid #f3f4f6"
                      : "none",
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    minWidth: "42px",
                    borderRadius: "12px",
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {getIcon(item.type, item.resource)}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "4px",
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      flexWrap: "wrap",
                      fontSize: "12px",
                      color: "#9ca3af",
                    }}
                  >
                    <span>{new Date(item.timestamp).toLocaleString()}</span>
                    {item.admin && (
                      <span
                        style={{
                          background: "#f3f4f6",
                          padding: "2px 8px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "#6b7280",
                        }}
                      >
                        by {item.admin}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* LOAD MORE BUTTON */}
            {hasMore && (
              <div
                style={{
                  textAlign: "center",
                  paddingTop: "20px",
                }}
              >
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  style={{
                    padding: "10px 28px",
                    borderRadius: "12px",
                    border: "none",
                    background: loadingMore
                      ? "#e5e7eb"
                      : "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    color: loadingMore ? "#9ca3af" : "#fff",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: loadingMore ? "not-allowed" : "pointer",
                    boxShadow: loadingMore
                      ? "none"
                      : "0 4px 14px rgba(79,70,229,0.3)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
