import pinkBlur from './Assets/pinkBlur.png'
import greenBlur from './Assets/greenBlur.png'
import purpleBlur from './Assets/purpleBlur.png'
import pokeBall from './Assets/pokeBall.png'

function Background() {

  return (
    <div className='backContainer'>
      <img src={greenBlur} className=' blur greenBlur' />

      <img src={pinkBlur} className=' blur pinkBlur' />

      <img src={purpleBlur} className='blur purpleBlur' />

      <img src={pokeBall} className='blur pokeBall' />
    </div>
  );
}
export default Background;
