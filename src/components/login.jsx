import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const { id } = useParams(); // optional question ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      // If ID exists, post to /login/:id, else /login
      const endpoint = id ? `/login/${id}` : "/login";

      const res = await fetch(`https://code-editor-backend-787k.onrender.com${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        
        
        
        if (id) {
          loginUser(data.data);

          navigate("/editor");
        } else if (data.role === "admin") {
          
          navigate("/admin");
        } else {
          navigate("/editor");
        }
      } else {
        setErrorMsg(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-background text-forground flex justify-center items-center">
      <div className="max-w-md  w-full bg-white p-6 rounded-xl shadow-md   ">
      <h2 className="text-2xl font-bold text-center mb-2 text-primary">
        Welcome Back
      </h2>
      <p className="text-sm text-gray-500 text-center mb-6">
        Sign in for the challenge
      </p>

      {errorMsg && (
        <p className="text-center text-red-500 font-medium mb-4">{errorMsg}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-hover transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
    </div>
    
  );
};

export default LoginForm;
