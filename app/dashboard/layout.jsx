import React from "react";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <footer className="bg-secondary text-center py-4 mt-12">
        <p className="text-sm text-gray-600">
          © 2024 AI Mock Interview App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default DashboardLayout;
