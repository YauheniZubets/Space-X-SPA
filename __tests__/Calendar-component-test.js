import React from 'react';
import renderer from 'react-test-renderer';

import Calendar from '../components/Calendar/Calendar';

test('работа CalendarComponent', () => {

  const calendar = renderer.create(
    <Calendar />
  );

  let componentTree=calendar.toJSON();
  
  expect(componentTree).toMatchSnapshot();
  
  expect(componentTree).toMatchSnapshot();
    
});
