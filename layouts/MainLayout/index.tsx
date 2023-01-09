import React from 'react';
import MainMenu from '~/components/AppMenu';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <MainMenu />
      {children}
    </section>
  );
};

export default MainLayout;
