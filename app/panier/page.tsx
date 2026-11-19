import { redirect } from 'next/navigation'

// Le panier est maintenant sur la page d'accueil.
export default function PanierPage() {
  redirect('/')
}
