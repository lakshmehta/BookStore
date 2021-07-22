import Enzyme, { shallow,  } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import React from 'react';
// import renderer from 'react-test-renderer';
import SignUp from '../components/SignUp/signup';

Enzyme.configure({ adapter: new EnzymeAdapter })
it("renders Login component without crashing ", () => {
    // const mountWrapper = mount(<Login/>)
    // console.log("wrapper", mountWrapper.debug());
    const shallowWrapper = shallow(<SignUp/>)
    console.log("wrapper", shallowWrapper.debug());


})
// it("render maindiv in component without crashing",()=>{
//     const shallowWrapper = shallow(<SignUp/>)
//     const maindiv=shallowWrapper.find(`[className="body"]`);
//     expect(maindiv.length).toBe(1)

// })
it("render email textfield in component without crashing",()=>{
    const shallowWrapper = shallow(<SignUp/>)
    const maindiv=shallowWrapper.find(`[id="outlined-basic"]`);
    expect(maindiv.length).toBe(2)

})
it("render button textfield in component without crashing",()=>{
    const shallowWrapper = shallow(<SignUp/>)
    const maindiv=shallowWrapper.find(`[className="buttonhai"]`);
    expect(maindiv.length).toBe(1)

})