import { useState, useEffect } from "react";
import { School, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Dashboard from "./Dashboard";


const Login = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backgroundImages = [
    "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-vh-100 position-relative overflow-hidden">
      <div className="position-absolute top-0 start-0 w-100 h-100">
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`position-absolute top-0 start-0 w-100 h-100 transition-opacity ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transition: "opacity 1s ease-in-out",
              zIndex: 0,
            }}
          ></div>
        ))}
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}></div>
      </div>

      <div className="position-relative z-1 min-vh-100 d-flex align-items-center justify-content-center p-3">
        <div className="card shadow-lg bg-white bg-opacity-75 border-0" style={{ maxWidth: "400px", width: "100%" }}>
          <div className="card-body">
            <div className="text-center mb-4">
              <div className="bg-primary  d-flex rounded-circle align-items-center justify-content-center mx-auto mb-3 bg-transparent" style={{ width: "64px", height: "64px" }}>
                <img src="image/logo.png" className="logo" style={{ width: "80px", height: "80px" }} />
              </div>
              <h4 className="card-title">ISPSC School Slinic</h4>
              <p className="text-muted">Sign in to access your dashboard</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text"><Mail size={16} /></span>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    placeholder="clinic@ISPSC.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text"><Lock size={16} /></span>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label htmlFor="rememberMe" className="form-check-label">Remember me</label>
                </div>
                <a href="#" className="text-primary text-decoration-none">Forgot password?</a>
              </div>

              {/* <button type="submit" className="btn btn-primary w-100" href={{Dashboard}}></button> */}
              <a className="btn btn-primary w-100" href="Dashboard">Sign In</a>
            </form>

            <div className="text-center mt-3">
              <p className="small">
                Don't have an account?{' '}
                <a href="#" className="text-primary">Contact Administrator</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="position-absolute bottom-0 start-50 translate-middle-x z-1 mb-3">
        <div className="d-flex gap-2">
          {backgroundImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentImageIndex(index)}
              className={`btn btn-sm rounded-circle p-1 ${
                index === currentImageIndex ? "bg-white" : "bg-white bg-opacity-50"
              }`}
              style={{ width: "10px", height: "10px" }}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Login;
