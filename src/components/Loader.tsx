import React from 'react';
import { Watch } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex justify-center my-36">
      <Watch
        height="100"
        width="100"
        radius="48"
        color="#FD8469"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
