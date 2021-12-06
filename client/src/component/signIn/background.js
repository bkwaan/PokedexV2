
import pinkBlur from './Assets/pinkBlur.png'
import greenBlur from './Assets/greenBlur.png'
import purpleBlur from './Assets/purpleBlur.png'
import pokeBall from './Assets/pokeBall.png'




function Background(props) {

    return (
        <div>
            <img src={greenBlur} className='greenBlur' />

            <img src={pinkBlur} className='pinkBlur' />

            <img src={purpleBlur} className='purpleBlur' />

            <img src={pokeBall} className='pokeBall' />
        </div>
    );
}

export default Background;
