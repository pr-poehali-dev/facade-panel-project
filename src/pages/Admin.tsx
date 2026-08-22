import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const GET_REQUESTS_URL = "https://functions.poehali.dev/4a3d4fa7-408b-47b7-bcb5-97eb480d98d3";

interface RequestItem {
  id: number;
  name: string;
  phone: string;
  houseType: string;
  wallMaterial: string;
  area: string;
  color: string;
  createdAt: string;
}

export default function Admin() {
  const [password, setPassword] = useState(localStorage.getItem("admin_password") || "");
  const [inputPassword, setInputPassword] = useState("");
  const [requests, setRequests] = useState<RequestItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRequests = async (pwd: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(GET_REQUESTS_URL, {
        headers: { "X-Admin-Password": pwd },
      });
      if (res.status === 401) {
        setError("Неверный пароль");
        localStorage.removeItem("admin_password");
        setPassword("");
        setLoading(false);
        return;
      }
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setRequests(data.requests);
      localStorage.setItem("admin_password", pwd);
    } catch {
      setError("Не удалось загрузить заявки");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) loadRequests(password);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPassword(inputPassword);
    loadRequests(inputPassword);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_password");
    setPassword("");
    setRequests(null);
  };

  if (!password || requests === null) {
    return (
      <div className="min-h-screen bg-sand-100 flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-sm shadow-md border border-sand-200 p-8 w-full max-w-sm"
        >
          <h1 className="font-heading text-2xl font-bold text-foreground mb-6 text-center">
            Заявки с сайта
          </h1>
          <input
            type="password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder="Пароль"
            autoFocus
            className="w-full border border-sand-300 rounded-sm px-4 py-3 font-body focus:outline-none focus:border-brick-500 bg-sand-50 mb-4"
          />
          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brick-600 hover:bg-brick-500 disabled:opacity-60 text-white py-3 font-heading tracking-wider rounded-sm transition-colors"
          >
            {loading ? "ПРОВЕРЯЕМ..." : "ВОЙТИ"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand-100 py-10 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Заявки с сайта</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => loadRequests(password)}
              className="flex items-center gap-2 text-sm text-brick-600 hover:text-brick-500"
            >
              <Icon name="RefreshCw" size={16} />
              Обновить
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Icon name="LogOut" size={16} />
              Выйти
            </button>
          </div>
        </div>

        {requests.length === 0 ? (
          <div className="bg-white rounded-sm border border-sand-200 p-12 text-center text-muted-foreground">
            Заявок пока нет
          </div>
        ) : (
          <div className="bg-white rounded-sm border border-sand-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[hsl(20,40%,12%)] text-white text-left">
                    <th className="px-4 py-3 font-heading tracking-wider">Дата</th>
                    <th className="px-4 py-3 font-heading tracking-wider">Имя</th>
                    <th className="px-4 py-3 font-heading tracking-wider">Телефон</th>
                    <th className="px-4 py-3 font-heading tracking-wider">Объект</th>
                    <th className="px-4 py-3 font-heading tracking-wider">Материал</th>
                    <th className="px-4 py-3 font-heading tracking-wider">Площадь</th>
                    <th className="px-4 py-3 font-heading tracking-wider">Цвет</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r, i) => (
                    <tr key={r.id} className={i % 2 === 0 ? "bg-white" : "bg-sand-50"}>
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                        {new Date(r.createdAt).toLocaleString("ru-RU")}
                      </td>
                      <td className="px-4 py-3 font-medium">{r.name}</td>
                      <td className="px-4 py-3">
                        <a href={`tel:${r.phone}`} className="text-brick-600 hover:underline">
                          {r.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3">{r.houseType || "—"}</td>
                      <td className="px-4 py-3">{r.wallMaterial || "—"}</td>
                      <td className="px-4 py-3">{r.area ? `${r.area} м²` : "—"}</td>
                      <td className="px-4 py-3">{r.color || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
