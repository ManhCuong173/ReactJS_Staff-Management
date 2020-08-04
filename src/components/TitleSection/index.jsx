import React from 'react';

function TitleSection (props) {
  return (
    <div className="title" style={{...props}}>
      {props.children}
    </div>
  );
}

export default TitleSection;
