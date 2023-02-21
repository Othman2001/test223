import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useActions, useAppState } from 'services/store/config';
import { GetServerSideProps } from 'next';

export default function IndexPage() {
  const { t } = useTranslation("common");
  const { push, pathname } = useRouter();
  const {counter:{counter} } = useAppState();
  const { counter:{incrment}} = useActions();
  return (
    <div>
      {t('name')}
      <button type="button" onClick={() => push(pathname, undefined, { locale: 'en' })}>
        {' '}
        translatte to english
      </button>
      <button type="button" onClick={() => push(pathname, undefined, { locale: 'ar' })}>
        {' '}
        translatte
      </button>
      <div>
        {counter}
      </div>
      <button onClick={incrment } type='button' > incrment</button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => ({
    props: {
      ...(await serverSideTranslations(context.locale || "en", ['common'])),
    },
  });