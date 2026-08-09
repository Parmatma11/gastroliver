import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className={styles.nav} aria-label="breadcrumb">
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link href="/" className={styles.link}>Home</Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className={styles.item}>
              <span className={styles.separator}>/</span>
              {isLast || !item.path ? (
                <span className={styles.active} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.path} className={styles.link}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
