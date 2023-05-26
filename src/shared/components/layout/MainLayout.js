import React from 'react';
 
function MainLayout(props) {
    return (
        <div className="MainLayout">
            {props.children}
        </div>
    )
}
export default MainLayout;