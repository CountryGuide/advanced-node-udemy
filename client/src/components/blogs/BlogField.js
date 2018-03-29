import React from 'react';


export default ({ input, label, meta: { error, touched } }) => {
    return (
        <div className={input.name}>
            <label>{label}</label>
            <input {...input} />
            <div className="red-text" >
                {touched && error}
            </div>
        </div>
    );
};
