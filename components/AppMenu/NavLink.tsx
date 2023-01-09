import cn from 'classnames';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import styles from './styles.module.scss';

export interface NavLinkProps extends LinkProps {
  children: React.ReactElement;
}

export default function NavLink({ children, href, ...props }: NavLinkProps) {
  const router = useRouter();
  const actived = router.pathname === href;
  return (
    <Link href={href} {...props} className={cn(styles.link, { [styles.active]: actived })}>
      {children}
    </Link>
  );
}
