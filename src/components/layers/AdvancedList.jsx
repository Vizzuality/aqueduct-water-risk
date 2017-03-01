import React from 'react';
import { Timeline } from 'aqueduct-components';

const points = [
  {
    label: '',
    value: '1'
  },
  {
    label: '',
    value: '2'
  },
  {
    label: '',
    value: '3'
  },
  {
    label: '',
    value: '4'
  },
  {
    label: '',
    value: '5'
  }
];

export default function AdvancedList() {
  return (
    <Timeline className="-rate -bloqued" items={points} selected={{ value: '3' }} onChange={() => {}} />
  );
}

AdvancedList.propTypes = {};
