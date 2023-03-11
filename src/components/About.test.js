import React from 'react';
import Adapter from 'enzyme-adapter-react-15';
import { shallow } from 'enzyme';
import Giftgiver from './giftgiver';

const giftgiver = shallow(<Giftgiver />);
it('renders correctly', () => {
  expect(giftgiver).toMatchSnapshot();
});
