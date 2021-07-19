import React from 'react';
import heroHeader from '../../../assets/heroHeader.png';

export const ErrorBoundaryFallback: React.VFC = () => (
  <>
    <h1>ただいまアクセスしずらくなっております</h1>
    <p>
      ご迷惑をおかけして申し訳ございませんが、よろしくお願いいたします。
      <br />
    </p>
    <img src={heroHeader} alt="heroHeader" />
  </>
);
