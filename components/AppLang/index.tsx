import { useRouter } from 'next/router';
import React from 'react';

const AppLang = () => {
  const router = useRouter();

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div>
      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onToggleLanguageClick(e.target.value)
        }
      >
        {router?.locales?.map((lang, i) => (
          <option key={i} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AppLang;
