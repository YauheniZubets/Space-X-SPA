"use strict";

import {getAge} from '../components/Modalreg/modules/getUserAge';

test('проверка получения возраста пользователя по дате рождения', () => {

  expect(getAge('1993/05/17')).toBe(27);

  expect(getAge('2020/05/17')).toBe(0);

  expect(getAge('1979/05/17')).toBe(41);

});