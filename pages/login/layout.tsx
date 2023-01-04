import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav>hihi</nav>

      {children}
    </section>
  );
};

export default RootLayout;
