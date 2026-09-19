import React from "react";
import { loginAction } from "./actions";
import { Lock } from "lucide-react";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const isError = searchParams.error === "1";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-24 w-auto rounded-full"
          src="/logo-fkip-clean.png"
          alt="Logo FKIP"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#0B315A]">
          Login CMS Fakultas
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          <form className="space-y-6" action={loginAction}>
            
            {isError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Username atau Password salah!
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  name="username"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0B315A] focus:border-[#0B315A] sm:text-sm"
                  placeholder="admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  name="password"
                  type="password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#0B315A] focus:border-[#0B315A] sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0B315A] hover:bg-[#1a4b82] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0B315A] transition-colors"
              >
                Masuk ke Dashboard
              </button>
            </div>
          </form>
          
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
             <a href="/" className="text-[#B48B36] hover:text-[#8a6825] text-sm font-medium">
              &larr; Kembali ke Website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
