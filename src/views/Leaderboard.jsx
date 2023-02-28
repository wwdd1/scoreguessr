import React, { useState, useEffect } from 'react';
import SiteLayout from '../components/layouts/SiteLayout';
import LadderTable from '../components/LadderTable';

function Leaderboard() {

  const data = [
    {
      order: 1,
      user: {
        displayName: 'John Brown',
      },
      points: 32,
    },
    {
      order: 2,
      user: {
        displayName: 'Jim Green',
      },
      points: 22,
    },
    {
      order: 3,
      user: {
        displayName: 'Joe Black',
      },
      points: 10,
    },
    {
      order: 4,
      user: {
        displayName: 'Joe Black',
      },
      points: 10,
    },
    {
      order: 5,
      user: {
        displayName: 'Joe Black',
      },
      points: 10,
    },
  ];


  return (
    <SiteLayout>
      <LadderTable data={data}></LadderTable>
    </SiteLayout>
  );
}

export default Leaderboard;
