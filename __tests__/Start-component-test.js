import React from 'react';
import renderer from 'react-test-renderer';

import Start from '../components/Start/Start';

test('работа StartComponent', () => {

  const start = renderer.create(
    <Start rockets={[
      {name: "Falcon 1"},
      {name: "Falcon 9"},
      {name: "Falcon Heavy"},
      {name: "Starship"}
    ]} userInfo='Имя пользователя для теста' />
  );

  let componentTree=start.toJSON();
  
  expect(componentTree).toMatchSnapshot();
  
  expect(componentTree).toMatchSnapshot();
    
});
