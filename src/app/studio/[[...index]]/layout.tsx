import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GastroLiver Admin Studio',
  description: 'Sanity CMS editing dashboard for GastroLiver',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ margin: 0, padding: 0, height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, zIndex: 99999, background: '#fff' }}>
      {children}
    </div>
  );
}
