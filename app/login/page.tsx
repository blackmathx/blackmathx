'use client'

import { login } from './actions'
// import { signup } from './actions'

export default function LoginPage() {
  return (
    <form className="max-w-sm mx-auto mt-16 p-8 bg-white rounded shadow space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
        <input id="email" name="email" type="email" required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
        <input id="password" name="password" type="password" required className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div className="flex gap-4">
        <button type="submit" formAction={login} className="flex-1 bg-slate-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">Sign in</button>
        {/* <button type="submit" formAction={signup} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition-colors">Sign up</button> */}
      </div>
    </form>
  )
}