import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../formcontrols/inputfield/InputField';

Form.propTypes = {
    
};

function Form(props) {
    const form = useForm({
        defaultValues:{
            title: "",
        },
    });
    return (
        <div>
            Form
            <InputField />
        </div>
    );
}

export default Form;