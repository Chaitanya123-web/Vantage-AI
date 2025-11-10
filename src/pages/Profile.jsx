import React, { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

const NavbarSimple = () => (
  <nav className="mx-auto max-w-screen-xl px-6 py-4 sticky top-0 z-50">
    <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-3xl border border-gray-200/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#06A77D] to-[#D5C67A] bg-clip-text text-transparent">
          Vantage AI
        </div>
        <div className="flex items-center space-x-2">
          <a href="/dashboard" className="px-4 py-2 text-gray-700 hover:bg-[#afcbff]/20 rounded-full transition-all">
            Dashboard
          </a>
          <a href="/profile" className="px-4 py-2 text-gray-700 hover:bg-[#afcbff]/20 rounded-full transition-all font-semibold">
            Profile
          </a>
        </div>
      </div>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-gradient-to-br from-[#161032] via-[#2a1f4f] to-[#161032] py-8">
    <div className="text-center text-[#afcbff] text-sm">
      &copy; {new Date().getFullYear()} Vantage AI. All rights reserved.
    </div>
  </footer>
);

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/api/profile");
        setUser({ name: res.data.name, email: res.data.email });
        setError("");
      } catch (err) {
        console.error("Profile fetch error:", err);
        const errorMsg = err.response?.data?.message || err.response?.data || err.message || "Failed to fetch profile";
        setError(errorMsg);
        setUser({ name: "", email: "" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditClick = () => {
    setEditData({ name: user.name, email: user.email, password: "", confirmPassword: "" });
    setEditMode(true);
    setSuccess("");
    setError("");
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditData({ name: "", email: "", password: "", confirmPassword: "" });
    setError("");
    setSuccess("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editData.password && editData.password !== editData.confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    try {
      const updatePayload = { name: editData.name, email: editData.email };
      if (editData.password) {
        updatePayload.password = editData.password;
      }

      const res = await axios.put("/api/profile", updatePayload);

      setSuccess("Profile updated successfully!");
      setError("");
      setUser({ name: res.data.name, email: res.data.email });
      setEditMode(false);
      setEditData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      console.error("Update Error:", err);
      setError(err.response?.data?.message || "Update failed.");
      setSuccess("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center py-20 bg-gradient-to-b from-[#afcbff] to-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#06A77D]"></div>
        <p className="mt-4 text-[#161032] font-semibold">Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#afcbff] via-white to-gray-50">
      <NavbarSimple />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-5xl font-bold text-center mb-3 text-[#161032]">My Profile</h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Manage your personal information and account settings
        </p>

        {error && (
          <div className="mb-6 max-w-2xl mx-auto">
            <p className="text-red-600 bg-red-50 border-l-4 border-red-600 p-4 rounded-xl text-center">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 max-w-2xl mx-auto">
            <p className="text-green-600 bg-green-50 border-l-4 border-[#06A77D] p-4 rounded-xl text-center">{success}</p>
          </div>
        )}

        {!editMode ? (
          // VIEW MODE - Profile Display
          <div className="bg-white shadow-2xl rounded-3xl max-w-2xl mx-auto border border-gray-100 overflow-hidden">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-[#161032] via-[#2a1f4f] to-[#161032] px-8 py-16 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#06A77D] rounded-full blur-3xl opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f1a208] rounded-full blur-3xl opacity-20"></div>
              
              <div className="flex items-center space-x-6 relative z-10">
                <div className="w-28 h-28 bg-gradient-to-br from-[#06A77D] to-[#D5C67A] rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
                  {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div>
                  <h2 className="text-4xl font-bold mb-2">{user.name || "Unknown User"}</h2>
                  <p className="text-[#afcbff] text-xl">{user.email || "No email"}</p>
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-8">
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-sm font-bold text-[#D5C67A] uppercase tracking-wider mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-4 px-5 bg-gradient-to-r from-[#afcbff]/10 to-transparent rounded-2xl border border-[#afcbff]/30">
                      <span className="text-gray-600 font-semibold">Full Name</span>
                      <span className="text-[#161032] font-bold">{user.name || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center py-4 px-5 bg-gradient-to-r from-[#afcbff]/10 to-transparent rounded-2xl border border-[#afcbff]/30">
                      <span className="text-gray-600 font-semibold">Email Address</span>
                      <span className="text-[#161032] font-bold">{user.email || "N/A"}</span>
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="text-sm font-bold text-[#D5C67A] uppercase tracking-wider mb-4">
                    Security
                  </h3>
                  <div className="flex justify-between items-center py-4 px-5 bg-gradient-to-r from-[#afcbff]/10 to-transparent rounded-2xl border border-[#afcbff]/30">
                    <span className="text-gray-600 font-semibold">Password</span>
                    <span className="text-gray-400 text-lg">••••••••</span>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleEditClick}
                    className="px-8 py-4 bg-gradient-to-r from-[#06A77D] to-[#048a64] text-white rounded-2xl font-bold hover:from-[#048a64] hover:to-[#06A77D] transition-all transform hover:scale-105 shadow-lg hover:shadow-[#06A77D]/50"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // EDIT MODE - Form
          <div className="bg-white shadow-2xl rounded-3xl p-8 max-w-2xl mx-auto border border-gray-100">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#161032] mb-2">Edit Profile</h2>
              <p className="text-gray-600">Update your personal information below</p>
            </div>

            {error && <p className="text-red-600 bg-red-50 border-l-4 border-red-600 p-4 rounded-xl mb-6">{error}</p>}

            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label className="block mb-2 font-bold text-[#161032]">Full Name</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#06A77D] focus:ring-2 focus:ring-[#06A77D]/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-bold text-[#161032]">Email Address</label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#06A77D] focus:ring-2 focus:ring-[#06A77D]/20 transition-all"
                  required
                />
              </div>

              <div className="border-t-2 border-gray-200 pt-6">
                <h3 className="text-xl font-bold mb-5 text-[#161032]">Change Password (Optional)</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-bold text-[#161032]">New Password</label>
                    <input
                      type="password"
                      placeholder="Leave blank to keep current password"
                      value={editData.password}
                      onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#06A77D] focus:ring-2 focus:ring-[#06A77D]/20 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-bold text-[#161032]">Confirm Password</label>
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={editData.confirmPassword}
                      onChange={(e) => setEditData({ ...editData, confirmPassword: e.target.value })}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#06A77D] focus:ring-2 focus:ring-[#06A77D]/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-8 py-4 bg-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-[#06A77D] to-[#048a64] text-white rounded-2xl font-bold hover:from-[#048a64] hover:to-[#06A77D] transition-all transform hover:scale-105 shadow-lg hover:shadow-[#06A77D]/50"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  return <Profile />;
};

export default App;