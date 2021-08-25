import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_KEY } from 'react-native-dotenv';

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    localStorage: AsyncStorage,
  }
);
