import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

window._env_ = window._env_ || {}

HTMLCanvasElement.prototype.getContext = () => undefined

window.confirm = window.confirm || (() => undefined)
window.alert = window.alert || (() => undefined)