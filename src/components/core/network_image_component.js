import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ShimmerCardComponent from './state_components/shimmer_card_component';

function NetworkImageComponent(props) {
    const [imageData, setImageData] = useState({ image: null });

    useEffect(() => {
        const fetchImageData = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/public/' + props.src, {
                    responseType: 'arraybuffer',
                });
                setImageData({ image: URL.createObjectURL(new Blob([response.data])) });
            } catch (error) {
                setImageData({ error: true, image: null });
            }
        };

        fetchImageData();
    }, [props.src]);



    return (
        <>
            {
                imageData.image ? (<img src={imageData.image} alt="Image" className={props.className} style={props.style}
                    onClick={props.onClick} />
                ) : (<div className={props.className} style={props.style} />)
            }
        </>
    );
}

export default NetworkImageComponent

