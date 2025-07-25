import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
	return await updateSession(request)
}

export const config = {
	matcher: [
		/* Match all request paths except for the ones starting with: 
		* _next/static (static files), _next/image (image optimization files), favicon.ico (favicon file)     
		*/
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}


export async function updateSession(request: NextRequest) {
	let supabaseResponse = NextResponse.next({
		request,
	})

	const supabase = createServerClient(
		process.env.SUPABASE_URL!,
		process.env.SUPABASE_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll()
				},
				setAll(cookiesToSet) {
					// 6/10/25 BO removed unused variable options
					//cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
					cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))

					supabaseResponse = NextResponse.next({
						request,
					})
					cookiesToSet.forEach(({ name, value, options }) =>
						supabaseResponse.cookies.set(name, value, options)
					)
				},
			},
		}
	)

	// Do not run code between createServerClient and
	// supabase.auth.getUser(). A simple mistake could make it very hard to debug
	// issues with users being randomly logged out.

	// IMPORTANT: DO NOT REMOVE auth.getUser()
	const {
		data: { user },
	} = await supabase.auth.getUser()


	if (
		!user &&
		!request.nextUrl.pathname.startsWith('/login') &&
		!request.nextUrl.pathname.startsWith('/auth') &&

		// allow access without login
		request.nextUrl.pathname !== '/' &&
		request.nextUrl.pathname !== '/github' &&
		request.nextUrl.pathname !== '/photos' &&
		!request.nextUrl.pathname.startsWith('/photos/') &&
		request.nextUrl.pathname !== '/rss-feed' &&
		request.nextUrl.pathname !== '/links'

	) {
		// no user, potentially respond by redirecting the user to the login page

		// BO 6/14/25 remove default redirect to login page
		//  const url = request.nextUrl.clone()
		// 	url.pathname = '/login'
		//  return NextResponse.redirect(url)
		
		
		return NextResponse.rewrite(new URL('/404', request.url));
				
	} else if (user) {
		console.log('User is authenticated:', user.created_at, user.email)
	}



	// IMPORTANT: You *must* return the supabaseResponse object as it is.
	// If you're creating a new response object with NextResponse.next() make sure to:
	// 1. Pass the request in it, like so:
	//    const myNewResponse = NextResponse.next({ request })
	// 2. Copy over the cookies, like so:
	//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
	// 3. Change the myNewResponse object to fit your needs, but avoid changing
	//    the cookies!
	// 4. Finally:
	//    return myNewResponse
	// If this is not done, you may be causing the browser and server to go out
	// of sync and terminate the user's session prematurely!

	return supabaseResponse
}