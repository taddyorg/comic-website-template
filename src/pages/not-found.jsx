import * as React from "react";

export default function NotFound() {  
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className='text-lg font-bold mt-2 text-primary'>404 - Not Found</h1>
      <p className='text-lg font-bold mt-2 text-primary'>The page you are looking for does not exist.</p>
    </div>
  );
}