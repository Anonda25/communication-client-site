import React from 'react';

const DynamicTitle = ({heading, subTitle}) => {
    return (
        <div className='w-3/12 mx-auto text-center my-2'>
            <p className='text-yellow-600 mb-3'>{heading}</p>
            <p className='lg:text-3xl uppercase border-y-4 py-2 '>{subTitle}</p>

        </div>
    );
};

export default DynamicTitle;