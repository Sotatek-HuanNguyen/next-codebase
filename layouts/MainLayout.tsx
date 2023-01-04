import Link from 'next/link';
import React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">login</Link>
          </li>
        </ul>
      </nav>

      {children}
    </section>
  );
};

export default MainLayout;
