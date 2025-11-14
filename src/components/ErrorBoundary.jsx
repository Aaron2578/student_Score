// ErrorBoundary.jsx
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.toString() };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: "20px",
            maxWidth: "500px",
            margin: "40px auto",
            textAlign: "center",
            background: "#fff",
            borderRadius: "12px",
            boxShadow: "0 0 12px rgba(0,0,0,0.15)",
          }}
        >
          <h2 style={{ color: "#E63946" }}>⚠️ Something went wrong</h2>
          <p style={{ fontSize: "14px", color: "#555" }}>
            {this.state.errorMessage}
          </p>

          <button
            onClick={this.handleReset}
            style={{
              marginTop: "10px",
              padding: "10px 16px",
              borderRadius: "8px",
              border: "none",
              background: "#1D3557",
              color: "white",
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
