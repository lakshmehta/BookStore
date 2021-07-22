import Enzyme, { shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
// import renderer from 'react-test-renderer';
import Login from '../Components/Login/login';

Enzyme.configure({ adapter: new EnzymeAdapter })
it("renders Login component without crashing ", () => {
    // const mountWrapper = mount(<Login/>)
    // console.log("wrapper", mountWrapper.debug());
    const shallowWrapper = shallow(<Login/>)
    console.log("wrapper", shallowWrapper.debug());


})
it("render maindiv in component without crashing",()=>{
    const shallowWrapper = shallow(<Login/>)
    const maindiv=shallowWrapper.find(`[className="body"]`);
    expect(maindiv.length).toBe(1)

})
it("render email textfield in component without crashing",()=>{
    const shallowWrapper = shallow(<Login/>)
    const maindiv=shallowWrapper.find(`[id="outlined-basic"]`);
    expect(maindiv.length).toBe(2)

})
it("render button textfield in component without crashing",()=>{
    const shallowWrapper = shallow(<Login/>)
    const maindiv=shallowWrapper.find(`[className="button1"]`);
    expect(maindiv.length).toBe(1)

})