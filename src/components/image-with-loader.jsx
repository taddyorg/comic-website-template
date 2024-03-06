import React, { useState, useEffect, useRef } from 'react';

export default function ImageWithLoader({ imageUrl, imgClassName }){
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const img = imageRef.current;
    if (img && img.complete) {
      setIsLoaded(true);
    }
  }, []);

  const onLoaded = () => {
    setIsLoaded(true);
  };

  return (
    <div>
      {!isLoaded && 
        <div className='flex w-full py-40 justify-center items-center'>
          <svg className="animate-spin h-5 w-5 ml-2 mr-1" viewBox="0 0 24 24">
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      }
      <img
        className={imgClassName}
        ref={imageRef}
        src={imageUrl}
        onLoad={onLoaded}/>
    </div>
  );
}