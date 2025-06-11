
import supabase from '../utils/supabaseClient.js';

export async function getAllUsers() {
  const { data, error } = await supabase.from('user').select('username, email');
  if (error) throw new Error(error.message);
  return data;
}

export async function createUser(username, email, password) {
  const { data, error } = await supabase.from('user').insert([{ username, email, password }]).select('username, email').single();
  if (error) throw new Error(error.message);
  return data;
}

export async function findUserByEmail(email) {
  const { data, error } = await supabase.from('user').select('*').eq('email', email).single();
  if (error && error.code !== 'PGRST116') throw new Error(error.message);
  return data || null;
}

export async function deleteUserByUsername(username) {
  const { data, error } = await supabase.from('user').delete().eq('username', username).select('username, email');
  if (error) throw new Error(error.message);
  return data;
}

export async function createCheckin(prediction, username) {
  const { data, error } = await supabase.from('CheckIn').insert([{ prediction, username }]).select('*').single();
  if (error) throw new Error(error.message);
  return data;
}
