import React from 'react';
import withAuth from '~/hoc/withAuthentication';
import MainLayout from '~/layouts/MainLayout';

const About = () => {
  return <div>About Page</div>;
};

About.layout = MainLayout;
export default withAuth(About);
