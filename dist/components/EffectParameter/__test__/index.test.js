import React from 'react';
import { shallow } from 'enzyme';
import EffectParameter from '../';
const propsMock = {
    id: 'delay',
    name: 'Delay',
    type: 'radio',
    onChange: jest.fn(),
};
describe('<EffectParameter />', () => {
    it('should renders without any errors', () => {
        const wrapper = shallow(React.createElement(EffectParameter, Object.assign({}, propsMock)));
        expect(wrapper).toMatchSnapshot();
    });
    describe('type', () => {
        it('"radio" renders <Radio />', () => {
            const props = {
                ...propsMock,
                type: 'radio',
            };
            const wrapper = shallow(React.createElement(EffectParameter, Object.assign({}, props)));
            const result = wrapper.find('.controlContainer').find('Radio').length === 1;
            expect(result).toBe(true);
        });
        it('"fader" renders <Fader />', () => {
            const props = {
                ...propsMock,
                type: 'fader',
            };
            const wrapper = shallow(React.createElement(EffectParameter, Object.assign({}, props)));
            const result = wrapper.find('.controlContainer').find('Fader').length === 1;
            expect(result).toBe(true);
        });
        it('returns nothing for unsupported type', () => {
            const props = {
                ...propsMock,
                type: 'weed',
            };
            const wrapper = shallow(React.createElement(EffectParameter, Object.assign({}, props)));
            const result = wrapper.isEmptyRender();
            expect(result).toBe(true);
        });
    });
    describe('onChange', () => {
        it('should be called on control change', () => {
            const wrapper = shallow(React.createElement(EffectParameter, Object.assign({}, propsMock)));
            wrapper.find('Radio').at(0).simulate('click');
            expect(propsMock.onChange).toBeCalled();
        });
    });
});
//# sourceMappingURL=index.test.js.map