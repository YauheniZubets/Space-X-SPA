import React from 'react';
import renderer from 'react-test-renderer';

import Detailscalendar from '../components/Detailscalendar/Detailscalendar';

test('работа DetailscalendarComponent', () => {

  const detailsCalendar = renderer.create(
    <Detailscalendar />
  );

  let componentTree=detailsCalendar.toJSON();
  
  expect(componentTree).toMatchSnapshot();
  
  expect(componentTree).toMatchSnapshot();
    
});
