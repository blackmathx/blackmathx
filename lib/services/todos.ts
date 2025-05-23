'use server'

import { supabase } from '../supabase/supabaseClient' 
import { Todo } from '@/lib/types/types'


export async function getTodos() {
  const { data: todos, error } = await supabase.from('todos').select('*')

  if (error) {
	console.error('Error fetching todos:', error);
	return [];
  }

  return todos;
}

export async function addTodo(todo: Todo) {
  const { data, error } = await supabase.from('todos').insert([todo])

  if (error) {
	console.error('Error adding todo:', error);
	return null;
  }

  return data;
}

