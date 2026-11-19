# Déploiement — Afro Beauty

Le site est un projet Next.js déployé sur Vercel. Chaque push sur `main` met le site à jour.

## Où modifier quoi

- `lib/catalog.ts` : prix des box, longueurs, couleurs, accessoires, livraison, numéro WhatsApp
- `app/page.tsx` : textes et sections de la page d'accueil
- `app/globals.css` : styles

## Commandes

Par défaut, la cliente envoie sa commande sur WhatsApp (06 02 56 74 74).

## Paiement par carte avec SumUp (optionnel)

1. Dans ton compte SumUp, crée une **clé API** (Développeurs › Clés API) et note ton **code marchand** (commence par `MC…`).
2. Sur Vercel › ton projet › Settings › Environment Variables, ajoute :
   - `SUMUP_API_KEY` = ta clé API (secrète, ne la partage jamais)
   - `SUMUP_MERCHANT_CODE` = ton code marchand
   - `NEXT_PUBLIC_APP_URL` = l'adresse de ton site (ex. `https://afrobeauty.vercel.app`)
   - `NEXT_PUBLIC_SUMUP_ENABLED` = `true`
3. Redéploie le site. Le bouton « Payer par carte » apparaît dans le panier.

Après le paiement, la cliente arrive sur `/success` et envoie sa commande sur WhatsApp avec la référence `AB-…`, que tu retrouves dans ton app SumUp.

## En local

```bash
npm install
npm run dev
```
