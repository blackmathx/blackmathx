import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  // 6/10/25 BO create client variable instead
  //return createServerClient(
  const client = createServerClient(

    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  // 6/10/25 BO
  return client 
}


// 6/10/25 BO export getUser
export async function getUser() {
  const { auth } = await createClient()

  const userObject = await auth.getUser()

  if(userObject.error) {
	return null
  }
  return userObject.data.user

}