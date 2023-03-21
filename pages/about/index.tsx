import React from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import withAuth from '~/hoc/withAuthentication';
import { useLoadItems } from '~/hooks/useLoadItems';
import MainLayout from '~/layouts/MainLayout';

const About = () => {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    // When there is an error, we stop infinite loading.
    // It can be reactivated by setting "error" state as undefined.
    disabled: !!error,
    // `rootMargin` is passed to `IntersectionObserver`.
    // We can use it to trigger 'onLoadMore' when the sentry comes near to become
    // visible, instead of becoming fully visible on the screen.
    rootMargin: '0px 0px 400px 0px',
  });
  return (
    <div>
      <h1>Infinite example</h1>
      {items.map((item) => (
        <h4 key={item.key}> {item.value}</h4>
      ))}

      {hasNextPage && (
        <h4 ref={infiniteRef}>
          <p>Loading...</p>
        </h4>
      )}
    </div>
  );
};

About.layout = MainLayout;
export default withAuth(About);
