import { redirect } from 'next/navigation'

// Admins and users share one sign-in page
export default function AdminLoginRedirect() {
  redirect('/login?next=/admin/dashboard')
}
