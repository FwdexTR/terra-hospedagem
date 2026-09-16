/**
 * Endereço público do site.
 *
 * Em produção a Vercel injeta NEXT_PUBLIC_SITE_URL quando ela está definida no
 * projeto; o padrão é o domínio próprio. Serve de base para as URLs absolutas
 * do sitemap, do robots e da prévia de compartilhamento no WhatsApp.
 */
export const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://terrahospedagem.com.br";
