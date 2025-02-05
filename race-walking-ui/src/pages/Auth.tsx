import { useState } from 'react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <div className="flex justify-center space-x-2 mb-4">
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            isLogin ? 'bg-black text-white' : 'text-gray-500'
          }`}
          onClick={() => setIsLogin(true)}
        >
          Log In
        </button>
        <button
          className={`px-4 py-2 rounded-md transition-colors ${
            !isLogin ? 'bg-black text-white' : 'text-gray-500'
          }`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">{isLogin ? 'Login' : 'Register'}</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          {isLogin && (
            <div className="flex items-center space-x-2">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-400" />
              <label className="text-sm">Remember me</label>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:underline"
          >
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}
