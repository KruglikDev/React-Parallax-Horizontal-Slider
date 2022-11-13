import {useEffect, useRef, useState} from "react";

//Images
import img1 from '../../images/1.png';
import img2 from '../../images/2.png';
import img3 from '../../images/3.png';
import img4 from '../../images/4.png';
import img5 from '../../images/5.png';
import img6 from '../../images/6.png';
import img7 from '../../images/7.png';
import img8 from '../../images/8.png';

//Styles
import './Slider.css';

const Slider = () => {
    const [sliderWidth, setSliderWidth] = useState();
    const [imageWidth, setImageWidth] = useState();
    const [current, setCurrent] = useState(0);
    const [target, setTarget] = useState(0);

    const images = [img1, img2, img3, img4, img5, img6, img7, img8];
    const sliderRef = useRef(null);

    let ease = .08;

    const lerp = (start, end, t) => {
        return start * (1-t) + end * t;
    }

    const init = () => {
        setSliderWidth(sliderRef.current.getBoundingClientRect().width);
        setImageWidth(sliderWidth / images.length);
        document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`;
    }

    const animate = () => {
        const data = lerp(current, target, ease);
        setCurrent(data.toFixed(2));
        setTarget(window.scrollY);
    }

    useEffect(() => {
        init();
    }, [sliderWidth])

    return (
        <div className='slider' ref={sliderRef} onWheel={animate} style={{transform: `translateX(-${current * 1.5}px)`}}>
            <div className="slider__inner">
                {images.map((image, i) => {
                    return (<div className="slide" key={i}>
                        <div
                            className="slide__img"
                            style={{backgroundImage: `url(${image})`, transform: `translateX(${((current / imageWidth) - (i * 0.7)) * 70}px)`}}
                        ></div>
                    </div>)
                })}
            </div>
        </div>
    );
}

export default Slider;

