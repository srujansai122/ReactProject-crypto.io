import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px 20px",
        color: "#333",
        backgroundColor: "#f4f6f8",
        minHeight: "80vh",
      }}
    >
      <h1 style={{ fontSize: "72px", marginBottom: "20px", color: "#007bff" }}>
        404
      </h1>
      <h2 style={{ marginBottom: "10px" }}>Page Not Found</h2>
      <p style={{ marginBottom: "30px" }}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "8px",
          fontWeight: "500",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default PageNotFound;
