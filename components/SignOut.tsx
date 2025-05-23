import { signout } from "@/app/login/actions";

export default function SignOut({ type = 'desktop' }: { type?: string }) {

	return (
		<form action={signout}>
			{type === 'mobile' ? (
				<button type="submit" className="block text-gray-700 hover:text-blue-600 w-full text-left">Sign out</button>
			) : (
				<button type="submit" className="flex-1 bg-slate-500 hover:bg-blue-700 text-white py-1 px-3 rounded transition-colors">Sign out</button>
			)}
		</form>
	)
}