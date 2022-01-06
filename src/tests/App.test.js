import React from 'react';
import Calculator from '../containers/Calculator';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('Calculator', () => {
  let container;
  let buttons = [];

  let buttonAdd;
  let buttonSubtract;
  let buttonMultiply;
  let buttonDivide;
  let buttonEquals;  
  let runningTotal;

  beforeEach(() => {
    container = mount(<Calculator/>);
    
    //add buttons to array with string concatenation
    //need to clear array each time
    buttons = [];
    for(let i = 0; i < 9; i++)
      buttons.push(container.find('#number' + (i)));

    buttonAdd       = container.find('#operator_add');
    buttonSubtract  = container.find('#operator-subtract');
    buttonMultiply  = container.find("#operator-multiply"); 
    buttonDivide    = container.find("#operator-divide");     
    buttonEquals    = container.find('#operator-equals');
    runningTotal    = container.find('#running-total');
  })

  it('should add 1 and 4 to get 5', () => {

    buttons[1].simulate('click');
    buttonAdd.simulate('click');
    buttons[4].simulate('click');
    buttonEquals.simulate('click');
    expect(runningTotal.text()).toEqual('5');
  });

  it('should subtract 4 from 7 to get 3', () => {

    buttons[7].simulate('click');
    buttonSubtract.simulate('click');
    buttons[4].simulate('click');
    buttonEquals.simulate('click');
    expect(runningTotal.text()).toEqual('3')
  });

  it('should mulitply 3 by 5 to get 15', () => {

    buttons[3].simulate('click');
    buttonMultiply.simulate('click');
    buttons[5].simulate('click');
    buttonEquals.simulate('click');
    expect(runningTotal.text()).toEqual('15')
  });

  it('should divide 21 by 7 to get 3', () => {

    buttons[2].simulate('click');
    buttons[1].simulate('click');
    buttonDivide.simulate('click');
    buttons[7].simulate('click');
    buttonEquals.simulate('click');
    expect(runningTotal.text()).toEqual('3')
  });

  it('should be able to concatenate 1 2 and 3',() => {

    buttons[1].simulate('click');
    buttons[2].simulate('click');
    buttons[3].simulate('click');
    expect(runningTotal.text()).toEqual('123')
  });
  
  it('should be able to chain multiple operations together',() => 
  {
    buttons[2].simulate('click');
    buttonMultiply.simulate('click');
    buttons[2].simulate('click');
    buttonSubtract.simulate('click');
    buttons[1].simulate('click');
    buttonDivide.simulate('click');
    buttons[3].simulate('click');
    buttonEquals.simulate('click');
    expect(runningTotal.text()).toEqual('1')
  });
});