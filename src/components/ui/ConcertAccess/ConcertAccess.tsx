import React from 'react';
import { SubHeading } from '../../helpers/SubHeading/SubHeading';

const API_KEY = process.env.REACT_APP_API_KEY ?? '';

export const ConcertAccess: React.VFC = () => (
  <div>
    <SubHeading variant="h5" paragraph>
      会場アクセス
    </SubHeading>
    <iframe
      title="map"
      width="100%"
      height="450"
      style={{ border: 0 }}
      loading="lazy"
      allowFullScreen
      src={`https://www.google.com/maps/embed/v1/place?q=place_id:ChIJ4R137qjvAGAR18pA_2nu0tw&key=${API_KEY}`}
    />
  </div>
);
