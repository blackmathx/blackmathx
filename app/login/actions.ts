'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
	const supabase = await createClient()

	// type-casting here for convenience
	// in practice, you should validate your inputs
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}

	const { error } = await supabase.auth.signInWithPassword(data)

	if (error) {
		redirect('/error')
	}

	// modify to redirect a user to the dashboard if their email is 'xya@gmail.com'
	if (data.email === 'jepayton12013@gmail.com') {
		redirect('/dashboard')
	}

	revalidatePath('/', 'layout')
	redirect('/')
}

export async function signup(formData: FormData) {
	// BO 6/13/25 - Don't allow signup
	redirect('/')
	
	const supabase = await createClient()

	// type-casting here for convenience. in practice, you should validate your inputs
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}

	const { error } = await supabase.auth.signUp(data)

	if (error) {
		redirect('/error')
	}

	revalidatePath('/', 'layout')
	redirect('/')
}


export async function signout() {
	const supabase = await createClient()
	await supabase.auth.signOut()
	revalidatePath('/', 'layout')
	redirect('/')
}