import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

Enzyme.configure({adapter:new EnzymeAdapter()});

const setup = (props={} , state=null) =>{
  const wrapper = shallow(<App {...props}/>)
  if(state)  wrapper.setState(state);
  return wrapper;
}

const findByTestAttr = (wrapper,val) =>{
  return wrapper.find(`[data-test="${val}"]`);
}

//shallow function takes jsx , and is is helpful in testing one level deep componet only!!
it('renders without crashing', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper,'component-app');
  expect(appComponent.length).toBe(1);
});

test('render increment button',()=>{
  const wrapper = setup();
  const button = findByTestAttr(wrapper,'increment-button')
  expect(button.length).toBe(1);
});

test('render counter display',()=>{
  const wrapper = setup();
  const counterdisplay = findByTestAttr(wrapper,'counter-display')
  expect(counterdisplay.length).toBe(1);
});

test('counter starts at 0',()=>{
  const wrapper=setup();
   const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

// enzyme simulate can be used to simulate the button click
test('when button clicke counter incremented in display',()=>{
  const counter = 7;
  const wrapper = setup(null, {counter});
  const button = findByTestAttr(wrapper,'increment-button')
  button.simulate('click');
  wrapper.update();
  const counterdisplay = findByTestAttr(wrapper,'counter-display')
  expect(counterdisplay.text()).toContain(counter +1 )
});
