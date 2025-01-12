import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const createSupabaseClient = () => {
  console.time('clientCreation')
  const client = createClientComponentClient()
  console.timeEnd('clientCreation')
  return client
}

export const supabase = createSupabaseClient()