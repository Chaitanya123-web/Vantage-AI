import React, { useState, useEffect } from "react";
import NavbarSimple from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:3000";

const Settings = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    emailAlerts: true,
    smsAlerts: false,
    notifications: true,
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current user settings from backend
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("/api/settings");
        if (res.data.preferences) {
          setSettings(res.data.preferences);
        }
        setIsLoading(false);
      } catch (err) {
        console.error("Settings fetch error:", err);
        setError("Failed to fetch settings.");
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  // Update settings on backend
  const handleSave = async () => {
    try {
      await axios.put("/api/settings", { preferences: settings });
      setSuccess("Settings updated successfully!");
      setError("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error("Settings update error:", err);
      setError("Failed to update settings.");
      setSuccess("");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-[#afcbff] to-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#06A77D]"></div>
        <p className="mt-4 text-[#161032] font-semibold">Loading Settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#afcbff] via-white to-gray-50">
      <NavbarSimple />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-12 w-full">
        <h1 className="text-5xl font-bold text-center mb-3 text-[#161032]">Account Settings</h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Customize your preferences and manage your Vantage AI account settings
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

        <div className="bg-white shadow-2xl rounded-3xl max-w-2xl mx-auto border border-gray-100 overflow-hidden">
          {/* Settings Header */}
          <div className="bg-gradient-to-r from-[#161032] via-[#2a1f4f] to-[#161032] px-8 py-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#06A77D] rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#f1a208] rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-[#06A77D] to-[#D5C67A] rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl mx-auto mb-4">
                ⚙️
              </div>
              <h2 className="text-3xl font-bold">Preferences</h2>
              <p className="text-[#afcbff] mt-2">Manage your account settings and notifications</p>
            </div>
          </div>

          {/* Settings Content */}
          <div className="p-8 space-y-6">
            {/* Notifications Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-sm font-bold text-[#D5C67A] uppercase tracking-wider mb-5">
                Notification Preferences
              </h3>
              
              <div className="space-y-4">
                {/* Email Alerts */}
                <div className="flex items-center justify-between py-4 px-5 bg-gradient-to-r from-[#afcbff]/10 to-transparent rounded-2xl border border-[#afcbff]/30">
                  <div>
                    <span className="text-[#161032] font-bold block">Email Alerts</span>
                    <span className="text-gray-600 text-sm">Receive updates via email</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.emailAlerts}
                      onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#06A77D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#06A77D] peer-checked:to-[#048a64]"></div>
                  </label>
                </div>

                {/* SMS Alerts */}
                <div className="flex items-center justify-between py-4 px-5 bg-gradient-to-r from-[#afcbff]/10 to-transparent rounded-2xl border border-[#afcbff]/30">
                  <div>
                    <span className="text-[#161032] font-bold block">SMS Alerts</span>
                    <span className="text-gray-600 text-sm">Receive updates via SMS</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.smsAlerts}
                      onChange={(e) => setSettings({ ...settings, smsAlerts: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#06A77D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#06A77D] peer-checked:to-[#048a64]"></div>
                  </label>
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between py-4 px-5 bg-gradient-to-r from-[#afcbff]/10 to-transparent rounded-2xl border border-[#afcbff]/30">
                  <div>
                    <span className="text-[#161032] font-bold block">Push Notifications</span>
                    <span className="text-gray-600 text-sm">Real-time browser notifications</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => setSettings({ ...settings, notifications: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#06A77D]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#06A77D] peer-checked:to-[#048a64]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Appearance Section */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-sm font-bold text-[#D5C67A] uppercase tracking-wider mb-5">
                Appearance
              </h3>
              
              <div className="flex items-center justify-between py-4 px-5 bg-gradient-to-r from-[#afcbff]/10 to-transparent rounded-2xl border border-[#afcbff]/30">
                <div>
                  <span className="text-[#161032] font-bold block">Dark Mode</span>
                  <span className="text-gray-600 text-sm">Enable dark theme (Coming Soon)</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.darkMode}
                    onChange={(e) => setSettings({ ...settings, darkMode: e.target.checked })}
                    className="sr-only peer"
                    disabled
                  />
                  <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all opacity-50 cursor-not-allowed"></div>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                onClick={handleSave}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#06A77D] to-[#048a64] text-white rounded-2xl font-bold hover:from-[#048a64] hover:to-[#06A77D] transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-[#06A77D]/50"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;